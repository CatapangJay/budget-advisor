"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getExpensesByCategory } from "@/services/supabase/transaction-services";

const chartConfig = {
  expenses: {
    label: "Expenses",
  },
} satisfies ChartConfig;

export function TransactionsCategoryDonut() {
  const [chartData, setChartData] = React.useState<
    { category: string; total_expense: number; fill: string }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      const targetMonth = new Date(); // Current month
      const expenses = await getExpensesByCategory(targetMonth);

      // Map the expenses data to include fill colors
      const mappedData = expenses.map((item, index) => ({
        ...item,
        fill: `hsl(var(--chart-${(index % 5) + 1}))`, // Dynamically assign colors
      }));

      setChartData(mappedData);
      setIsLoading(false);
    };

    fetchChartData();
  }, []);

  const totalExpenses = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total_expense, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>
          This month of {new Date().toLocaleString("default", { month: "long" })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total_expense"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            ${totalExpenses.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Expense
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
