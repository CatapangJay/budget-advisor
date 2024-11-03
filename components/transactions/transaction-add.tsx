"use client";

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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

import { createClient } from "@/utils/supabase/client";
import { addTransaction } from "@/services/supabase/transaction-services";
import { Transaction, TransactionType } from "../../models/transaction-models";
import { DatePicker } from "../date-picker";
import { categories } from "@/constants/data";


export function AddTransaction() {
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    description: "",
    amount: 0,
    type: TransactionType.EXPENSE,
    category: "",
    transaction_date: new Date(),
  });

  const { toast } = useToast()
  const isFormValid = newTransaction.description && newTransaction.amount > 0;

  const handleTransaction = async () => {
    if (newTransaction.description && newTransaction.amount > 0) {
      const data = await addTransaction(newTransaction);

      if (data) {
        toast({
          variant: "success",
          description: "Transaction added successfully",
        });
        setNewTransaction({ description: "", amount: 0, type: TransactionType.EXPENSE, category: "", transaction_date: new Date() });
      }
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
                {categories.map((category) => (
                  <SelectGroup key={category.category}>
                    <SelectLabel>
                      <category.icon className="mr-2 h-4 w-4 inline" />
                      {category.category}
                    </SelectLabel>
                    {category.subcategories.map((subcategory) => (
                      <SelectItem key={category.category + '_' + subcategory.name} value={subcategory.name}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
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
            <Select
              value={newTransaction.type}
              onValueChange={(value) =>
                setNewTransaction({
                  ...newTransaction,
                  type: value as TransactionType,
                })
              }
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <DatePicker
              date={newTransaction.transaction_date}
              onDateChange={(date: Date | undefined) =>
                setNewTransaction({
                  ...newTransaction,
                  transaction_date: date || new Date()
                })} />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleTransaction} disabled={!isFormValid}>Add Transaction</Button>
      </CardFooter>
    </Card>
  );
}
