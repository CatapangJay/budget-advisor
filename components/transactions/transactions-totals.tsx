"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { fetchTransactions, getMonthTotal, getNetMonthTotal, getTotalCount } from "@/services/supabase/transaction-services";
import { createClient } from "@/utils/supabase/client";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";

export function TransactionsTotalsCard({ className }: { className?: string }) {
  const supabase = createClient();
  const [totalAmount, setTotalAmount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   initAmount();
  // });

  useEffect(() => {
    if (totalAmount === undefined) {
      initAmount();
    }
    const channel = supabase.channel('realtime Total').on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'transactions'
    }, (payload) => {
      setTotalAmount(prevTotal => {
        const amountChange = payload.new.type === 'income' ? -payload.new.amount : payload.new.amount;
        return (prevTotal ?? 0) + amountChange;
      });
      // setTotalAmount(totalAmount ?? 0 + (payload.new.type === 'income' ? -1 : 1) * payload.new.amount);
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, totalAmount, setTotalAmount]);

  async function initAmount() {
    setIsLoading(true);
    const totalAmount = await getTotalCount();
    setTotalAmount(totalAmount);
    setIsLoading(false);
  }

  return (<Card className={className} x-chunk="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
    <CardHeader className="pb-2">
      <CardDescription>Total</CardDescription>
      {isLoading ? (
        <Skeleton className="h-12 w-1/2" />
      ) : (
        <CardTitle className="text-2xl overflow-hidden whitespace-nowrap">
          ₱ {
            (totalAmount === undefined || totalAmount === 0)
              ? "0.00"
              : totalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        </CardTitle>
      )}
    </CardHeader>
    <CardContent className="pb-2">
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <div className="text-xs text-muted-foreground">
          +25% from last week
        </div>
      )}
    </CardContent>
    {/* <CardFooter>
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <Progress value={25} aria-label="25% increase" />
      )}
    </CardFooter> */}
  </Card>)
}


export function TransactionsMonthTotalExpenseCard({ className }: { className?: string }) {
  const supabase = createClient();
  const [monthTotalAmount, setMonthTotalAmount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (monthTotalAmount === undefined) { initAmount() }
    const channel = supabase.channel('realtime expense month Total').on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'transactions'
    }, (payload) => {
      setMonthTotalAmount(prevTotal => {
        const amountChange = payload.new.type === 'income' ? -payload.new.amount : payload.new.amount;
        return (prevTotal ?? 0) + amountChange;
      });
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, monthTotalAmount, setMonthTotalAmount]);

  async function initAmount() {
    setIsLoading(true);
    const totalAmount = await getMonthTotal("expense");
    setMonthTotalAmount(totalAmount);
    setIsLoading(false);
  }

  return (<Card className={className} x-chunk="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
    <CardHeader className="pb-1">
      <CardDescription>Expense this Month</CardDescription>
      {isLoading ? (
        <Skeleton className="h-12 w-1/2" />
      ) : (
        <CardTitle className="text-2xl overflow-hidden whitespace-nowrap">
          ₱ {
            (monthTotalAmount === undefined || monthTotalAmount === 0)
              ? "0.00"
              : monthTotalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        </CardTitle>
      )}
    </CardHeader>
    <CardContent className="pb-3">
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <div className="text-xs text-muted-foreground">
          +25% from last week
        </div>
      )}
    </CardContent>
    {/* <CardFooter>
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <Progress value={25} aria-label="25% increase" />
      )}
    </CardFooter> */}
  </Card>)
}

export function TransactionsMonthTotalIncomeCard({ className }: { className?: string }) {
  const supabase = createClient();
  const [monthTotalAmount, setMonthTotalAmount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (monthTotalAmount === undefined) { initAmount() }
    const channel = supabase.channel('realtime income month Total').on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'transactions'
    }, (payload) => {
      setMonthTotalAmount(prevTotal => {
        const amountChange = payload.new.type === 'income' ? -payload.new.amount : payload.new.amount;
        return (prevTotal ?? 0) + amountChange;
      });
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, monthTotalAmount, setMonthTotalAmount]);

  async function initAmount() {
    setIsLoading(true);
    const totalAmount = await getMonthTotal("income");
    setMonthTotalAmount(totalAmount);
    setIsLoading(false);
  }

  return (<Card className={className} x-chunk="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
    <CardHeader className="pb-1">
      <CardDescription>Income this Month</CardDescription>
      {isLoading ? (
        <Skeleton className="h-12 w-1/2" />
      ) : (
        <CardTitle className="text-2xl overflow-hidden whitespace-nowrap">
          ₱ {
            (monthTotalAmount === undefined || monthTotalAmount === 0)
              ? "0.00"
              : monthTotalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        </CardTitle>
      )}
    </CardHeader>
    <CardContent className="pb-3">
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <div className="text-xs text-muted-foreground">
          +25% from last week
        </div>
      )}
    </CardContent>
  </Card>)
}

export function TransactionsNetTotalIncomeCard({ className }: { className?: string }) {
  const supabase = createClient();
  const [monthTotalAmount, setMonthTotalAmount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (monthTotalAmount === undefined) { initAmount() }
    const channel = supabase.channel('realtime net month Total').on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'transactions'
    }, (payload) => {
      setMonthTotalAmount(prevTotal => {
        const amountChange = payload.new.type === 'income' ? -payload.new.amount : payload.new.amount;
        return (prevTotal ?? 0) + amountChange;
      });
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, monthTotalAmount, setMonthTotalAmount]);

  async function initAmount() {
    setIsLoading(true);
    const totalAmount = await getNetMonthTotal();
    setMonthTotalAmount(totalAmount);
    setIsLoading(false);
  }

  return (<Card className={className} x-chunk="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
    <CardHeader className="pb-1">
      <CardDescription>Net Income</CardDescription>
      {isLoading ? (
        <Skeleton className="h-12 w-1/2" />
      ) : (
        <CardTitle className="text-2xl overflow-hidden whitespace-nowrap">
          ₱ {
            (monthTotalAmount === undefined || monthTotalAmount === 0)
              ? "0.00"
              : monthTotalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        </CardTitle>
      )}
    </CardHeader>
    <CardContent className="pb-3 whitespace-nowrap">
      {isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <div className="text-xs text-muted-foreground">
          Total Income minus Expenses
        </div>
      )}
    </CardContent>
  </Card>)
}