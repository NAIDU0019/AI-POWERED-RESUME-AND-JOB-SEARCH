import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isOnboarded, missingFields } = await getUserOnboardingStatus();

  // If any required fields are missing, redirect to onboarding
  if (!isOnboarded) {
    const searchParams = new URLSearchParams();
    if (missingFields?.length > 0) {
      searchParams.set('missing', missingFields.join(','));
    }
    redirect(`/onboarding?${searchParams.toString()}`);
  }

  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}