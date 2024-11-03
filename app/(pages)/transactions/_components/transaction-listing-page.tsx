import PageContainer from "@/components/layout/page-container";
import { TransactionsTable } from "@/components/transactions/transactions-tables";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import TransactionForm from "./transaction-form";

type TTransactionListingPage = {};

export default async function TransactionListingPage({}: TTransactionListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Transactions`}
            description="Manage transactions and their details."
          />
          <TransactionForm />
        </div>
        <Separator />
        <TransactionsTable />
      </div>
    </PageContainer>
  );
}
