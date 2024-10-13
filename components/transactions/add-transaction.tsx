import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Transaction = {
  id: number;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export function AddTransaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: "Salary Received on July", amount: 5000, type: "income", category: "Salary" },
    { id: 2, description: "Payment for July", amount: 1000, type: "expense", category: "Rent" },
    { id: 3, description: "Groceries for July", amount: 200, type: "expense", category: "Groceries"  },
  ]);

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
    {
      description: "",
      amount: 0,
      type: "expense",
      category: "",
    }
  );

  const addTransaction = () => {
    if (newTransaction.description && newTransaction.amount > 0) {
      setTransactions([
        ...transactions,
        { ...newTransaction, id: transactions.length + 1 },
      ]);
      setNewTransaction({ description: "", amount: 0, type: "expense", category: "" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
        <CardDescription>
          Enter the details of your new transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={newTransaction.amount || ""}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={newTransaction.category}
              onValueChange={(value) =>
                setNewTransaction({
                  ...newTransaction,
                  category: value as string
                })
              }
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="foods">Foods</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={newTransaction.type}
              onValueChange={(value) =>
                setNewTransaction({
                  ...newTransaction,
                  type: value as "income" | "expense",
                })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={addTransaction}>Add Transaction</Button>
      </CardFooter>
    </Card>
  );
}
