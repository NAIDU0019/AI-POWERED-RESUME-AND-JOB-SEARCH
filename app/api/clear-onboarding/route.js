import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await db.user.update({
      where: { clerkUserId: userId },
      data: {
        industry: null,
        experience: null,
        bio: null,
        skills: null,
      },
    });

    return new Response("Onboarding data cleared", { status: 200 });
  } catch (error) {
    console.error("Error clearing onboarding data:", error);
    return new Response("Failed to clear onboarding data", { status: 500 });
  }
}
