"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

// 1. Ensure user exists or create them
export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (existingUser) return existingUser;

  const name = `${user.firstName} ${user.lastName}`.trim();

  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress,
    },
  });

  return newUser;
}

// 2. Update user profile
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const userDetails = await clerkClient.users.getUser(userId);
  const email = userDetails.emailAddresses[0]?.emailAddress;
  if (!email) throw new Error("Email not found");

  console.log("Incoming user data:", data);

  const requiredFields = ["industry", "subIndustry", "experience", "skills"];
  const invalidFields = requiredFields.filter((field) => {
    const value = data[field];
    return value === null || value === undefined || value === "";
  });

  if (invalidFields.length > 0) {
    console.error("Invalid fields:", invalidFields);
    throw new Error(
      `Invalid data provided. Required: ${invalidFields.join(", ")}`
    );
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existingUser) {
    return await db.user.update({
      where: { clerkUserId: userId },
      data,
    });
  }

  // In case user doesn't exist (should be rare)
  return await db.user.create({
    data: {
      clerkUserId: userId,
      email,
      ...data,
    },
  });
}

// 3. Get onboarding status
export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

// 4. Get onboarding data
export async function getUserOnboardingData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true, experience: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching onboarding data:", error);
    throw new Error("Failed to fetch onboarding data");
  }
}
