import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import BudgetForm from './category-form';
import * as categoryTable from './category-table';

type TCategoriesListingPage = {};

export default async function CategoriesListingPage({ }: TCategoriesListingPage) {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Categories`}
            description="Budget Categories and their details."
          />
          <BudgetForm />
        </div>
        <Separator />
        <categoryTable.CategoriesTable />
      </div>
    </PageContainer>
  );
}
