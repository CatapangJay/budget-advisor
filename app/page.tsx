import { BudgetTrackerComponent } from "@/components/budget-tracker";
import Dashboard from "@/components/dashboard-05";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Page() {
  // return <BudgetTrackerComponent />
  return (
    <TooltipProvider>
      <Dashboard />
    </TooltipProvider>
  );
}
