import PageContainer from '@/components/layout/page-container';
import { TransactionsTable } from '@/components/transactions/transactions-tables';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import BudgetForm from './budget-form';
import { BudgetsTable } from './budget-table';

type TBudgetListingPage = {};

export default async function BudgetListingPage({ }: TBudgetListingPage) {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Budgets`}
            description="Budget Categories and their details."
          />
          <BudgetForm />
        </div>
        <Separator />
        <BudgetsTable />
      </div>
    </PageContainer>
  );
}
