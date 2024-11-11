import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function TransactionsCategoriesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
        <CardDescription>
          Enter the details of your new transaction.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
