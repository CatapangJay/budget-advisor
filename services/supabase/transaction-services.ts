import { Transaction } from "@/models/transaction-models";
import { createClient } from "@/utils/supabase/client";
import { UUID } from "crypto";

const supabase = createClient();

export async function fetchTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching transactions:', error)
        return []
    }

    return data || []
}

export async function getTotalCount(): Promise<number> {
    const { data, error } = await supabase
        .rpc('get_total_amount')

    if (error) {
        console.error('Error fetching total amount:', error)
        return 0
    }

    // `data` will return an array with the sum of 'amount'
    return data || 0
}

export async function getNetTotal(): Promise<number> {
    const { data, error } = await supabase
        .rpc('get_net_total_current_month')

    if (error) {
        console.error('Error fetching net total amount:', error)
        return 0
    }

    // `data` will return an array with the sum of 'amount'
    return data || 0
}

export async function getNetMonthTotal(): Promise<number> {
    const { data, error } = await supabase
        .rpc('get_net_total_current_month')

    if (error) {
        console.error('Error fetching current month total amount:', error)
        return 0
    }

    // `data` will return an array with the sum of 'amount'
    return data || 0
}


export async function getMonthTotal(type: string, targetMonth: Date = new Date()): Promise<number> {
    // Convert the Date object to a string in the format 'YYYY-MM-DD'
    const targetMonthString = targetMonth.toISOString().slice(0, 10);

    // Call the Supabase RPC function to get the total for the specified type and month
    const { data, error } = await supabase
        .rpc('get_monthly_total', { target_month: targetMonthString, trans_type: type });

    // Handle any errors from the RPC call
    if (error) {
        console.error(`Error fetching total ${type} for specified month:`, error);
        return 0;
    }

    // Return the sum of 'amount' for the specified month or 0 if no data
    return data || 0;
}

export async function getDailyExpenses(
    startDate: Date,
    endDate: Date
): Promise<{ day: string; daily_expense: number }[]> {
    // Convert startDate and endDate to 'YYYY-MM-DD' format strings
    const start_date = startDate.toISOString().slice(0, 10);
    const end_date = endDate.toISOString().slice(0, 10);

    // Call the Supabase RPC function for 'get_daily_expenses'
    const { data, error } = await supabase.rpc('get_daily_expenses', {
        start_date,
        end_date,
    });

    // Handle any errors from the RPC call
    if (error) {
        console.error('Error fetching daily expenses:', error);
        return [];
    }

    // Return the array of daily expenses
    return data || [];
}

export async function getExpensesByCategory(
    targetMonth: Date
): Promise<{ category: string; total_expense: number }[]> {
    // Convert targetMonth to 'YYYY-MM-DD' format string
    const target_month = targetMonth.toISOString().slice(0, 10);

    // Call the Supabase RPC function for 'get_monthly_expenses_per_category'
    const { data, error } = await supabase.rpc('get_monthly_expenses_per_category', {
        target_month,
    });

    // Handle any errors from the RPC call
    if (error) {
        console.error('Error fetching monthly expenses per category:', error);
        return [];
    }

    // Return the array of expenses grouped by category
    return data || [];
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction | null> {
    const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()

    if (error) {
        console.error('Error adding transaction:', error)
        return null
    }

    return data?.[0] || null
}

export async function updateTransaction(transaction: Transaction): Promise<Transaction | null> {
    const { data, error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', transaction.id)
        .select()

    if (error) {
        console.error('Error updating transaction:', error)
        return null
    }

    return data?.[0] || null
}

export async function deleteTransaction(id: UUID): Promise<boolean> {
    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting transaction:', error)
        return false
    }

    return true
}