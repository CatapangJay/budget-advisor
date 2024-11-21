"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDailyExpenses } from "@/services/supabase/transaction-services";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Helper function to generate a range of dates
const generateDateRange = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

const chartConfig = {
    daily_expense: {
        label: "Expense",
        color: "hsl(var(--chart-1))"
    },
} satisfies ChartConfig

export function DailyExpenses() {
    const [data, setData] = useState<any[]>([]);
    const [range, setRange] = useState<string>("1 week"); // Default range
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchExpenses = async () => {
        setIsLoading(true);

        // Define the date range based on the selected range
        const today = new Date();
        let startDate: Date;
        if (range === "1 week") {
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 6);
        } else if (range === "1 month") {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        } else if (range === "3 months") {
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 3);
        } else if (range === "6 months") {
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 6);
        } else if (range === "1 year") {
            startDate = new Date(today);
            startDate.setFullYear(today.getFullYear() - 1);
        } else {
            startDate = new Date(today);
        }

        // Fetch expenses data
        const fetchedData = await getDailyExpenses(startDate, today);

        // Generate full date range
        const dateRange = generateDateRange(startDate, today);

        // Map fetched data to the full date range
        const completeData = dateRange.map((date) => {
            const match = fetchedData.find((item: any) => item.day === date);
            return {
                day: date,
                daily_expense: match ? match.daily_expense : 0,
            };
        });

        setData(completeData);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchExpenses();
    }, [range]);

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Daily Expenses</CardTitle>
                    <CardDescription>Your daily expenses for the selected range.</CardDescription>
                </div>
                <div className="flex justify-end mb-4">
                    <Select
                        onValueChange={(value) => setRange(value)}
                        defaultValue="1 week"
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 week">Last 7 Days</SelectItem>
                            <SelectItem value="1 month">This Month</SelectItem>
                            <SelectItem value="3 months">Last 3 Months</SelectItem>
                            <SelectItem value="6 months">Last 6 Months</SelectItem>
                            <SelectItem value="1 year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <BarChart accessibilityLayer data={data}>
                            <XAxis
                                dataKey="day"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel={true} hideIndicator={true} />} />
                            <Bar dataKey="daily_expense" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
