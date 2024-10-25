"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { fetchTransactions } from "@/services/supabase/transaction-services";
import { createClient } from "@/utils/supabase/client";
import { LoadingSpinner } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Transaction } from "./transaction";
import { Checkbox } from "../ui/checkbox";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";

export function TransactionsTable() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactions.length === 0) {
      loadTransactions();
    }
    const channel = supabase
      .channel("realtime transactions")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          console.log({ payload });
          setTransactions([payload.new as Transaction, ...transactions]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, transactions, setTransactions]);

  async function loadTransactions() {
    setIsLoading(true);
    const fetchedTransactions = await fetchTransactions();
    setTransactions(fetchedTransactions);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        transactions.length === 0 ? (
          <div className="flex items-center justify-center p-6">
            <p>No recent transactions yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
                {/* Add other column headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="outline-red-400">
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </>
  );
}

export function RecentTransactionsTable() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("realtime recent transactions")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
        },
        (payload) => {
          console.log({ payload });
          setTransactions([payload.new as Transaction, ...transactions]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, transactions, setTransactions]);

  async function loadTransactions() {
    setIsLoading(true);
    const fetchedTransactions = await fetchTransactions();
    setTransactions(fetchedTransactions);
    setIsLoading(false);
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <LoadingSpinner size={40} />
          </div>
        ) : (transactions.length === 0 ? (
          <div className="flex items-center justify-center p-6">
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.type}</p>
                </div>
                <div
                  className={`font-bold ${transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                    }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )
        )}
      </CardContent>
    </Card>
  );
}
