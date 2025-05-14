"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const userDetails = await clerkClient.users.getUser(userId);
  const email = userDetails.emailAddresses[0]?.emailAddress;
  if (!email) throw new Error("Email not found");

  console.log("Incoming user data:", data);

  // Only check required fields
  const requiredFields = ["industry", "subIndustry", "experience", "skills"];
  const isValidData = requiredFields.every((field) => {
    const value = data[field];
    return value !== null && value !== undefined && value !== "";
  });

  if (!isValidData) {
    throw new Error("Invalid data provided. Ensure all required fields are filled.");
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

  return await db.user.create({
    data: {
      clerkUserId: userId,
      email,
      ...data,
    },
  });
}


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
