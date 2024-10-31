"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

import { Edit, Trash } from "lucide-react";
import { Budget } from "@/models/budget-models";
import { getBudgets } from "@/services/supabase/budget-services";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function BudgetsTable() {
  const supabase = createClient();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (budgets.length === 0) {
      loadBudgets();
    }
    const channel = supabase
      .channel("realtime Budgets")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "budgets",
        },
        (payload) => {
          console.log({ payload });
          setBudgets([payload.new as Budget, ...budgets]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, budgets, setBudgets]);

  async function loadBudgets() {
    setIsLoading(true);
    const fetchedBudgets = await getBudgets();
    setBudgets(fetchedBudgets);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <LoadingSpinner size={40} />
        </div>
      ) : (
        budgets.length === 0 ? (
          <div className="flex items-center justify-center p-6">
            <p>No recent Budgets yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Actions</TableHead>
                {/* Add other column headers as needed */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((Budget) => (
                <TableRow key={Budget.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{Budget.name}</TableCell>
                  <TableCell>{Budget.allocation}</TableCell>
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