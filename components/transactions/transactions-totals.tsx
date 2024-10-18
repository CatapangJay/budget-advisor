import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { fetchTransactions, getTotalCount } from "@/services/supabase/transaction-services";
import { createClient } from "@/utils/supabase/client";
import { Progress } from "../ui/progress";

export function TransactionsTotalsCard() {
    const supabase = createClient();
    const [totalAmount, setTotalAmount] = useState<number>()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (totalAmount === undefined) { initAmount() }
        const channel = supabase.channel('realtime transactions').on('postgres_changes', {
            event: 'INSERT', schema: 'public', table: 'transactions'
        }, (payload) => {
            console.log({ payload });
            setTotalAmount(totalAmount + payload.new.amount);
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

    return (<Card x-chunk="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">${totalAmount}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +25% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label="25% increase" />
        </CardFooter>
      </Card>)
}