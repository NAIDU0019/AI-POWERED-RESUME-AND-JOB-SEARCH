import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
  "/career-coach(.*)",
  
  "/api/recommend-jobs(.*)",
  "/api/career-chat(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  if (req.method === "DELETE" && req.nextUrl.pathname === "/api/clear-onboarding") {
    const clerkUserId = req.headers.get("clerk-user-id");

    if (!clerkUserId) {
      return NextResponse.json({ error: "Missing clerk-user-id" }, { status: 400 });
    }

    // Call the API route to delete user data
    const response = await fetch(`${req.nextUrl.origin}/api/clear-onboarding`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkUserId }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to delete user data" }, { status: 500 });
    }

    return NextResponse.json({ message: "User data deleted successfully" }, { status: 200 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};