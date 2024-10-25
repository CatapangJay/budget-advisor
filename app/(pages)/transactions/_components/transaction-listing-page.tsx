import PageContainer from '@/components/layout/page-container';
import { TransactionsTable } from '@/components/transactions/transactions-tables';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type TTransactionListingPage = {};

export default async function TransactionListingPage({}: TTransactionListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Transactions`}
            description="Manage transactions (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <TransactionsTable />
      </div>
    </PageContainer>
  );
}
