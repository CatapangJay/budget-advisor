import { TransactionsMonthTotalExpenseCard, TransactionsMonthTotalIncomeCard, TransactionsNetTotalIncomeCard, TransactionsTotalsCard } from "@/components/transactions/transactions-totals"
import { RecentTransactionsTable } from "@/components/transactions/transactions-tables"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { ListFilter, File, Plus } from "lucide-react"
import TransactionForm from "./_components/transaction-form"
import { DailyExpenses } from "./_components/transactions-bargraph"

export default function Page() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* <Card
                className="sm:col-span-2"
                x-chunk="A card for an orders dashboard with a description and a button to create a new order."
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card> */}
          {/* <TransactionsTotalsCard className="sm:col-span-2" /> */}
          {/* <TransactionsTotalsCard /> */}
          <TransactionsMonthTotalExpenseCard />
          <TransactionsMonthTotalIncomeCard />
          <TransactionsNetTotalIncomeCard />
        </div>
        <DailyExpenses />
      </div>
      <div>
        <RecentTransactionsTable />
      </div>

      {/* Floating Add Transaction Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <TransactionForm />
      </div>
    </main>
  )
}
