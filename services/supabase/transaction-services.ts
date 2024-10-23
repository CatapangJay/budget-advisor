import { createClient } from "@/utils/supabase/client";

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
        console.error('Error fetching total amount:', error)
        return 0
    }

    // `data` will return an array with the sum of 'amount'
    return data || 0
}

export async function getMonthTotal(): Promise<number> {
    const { data, error } = await supabase
        .rpc('get_net_total_current_month')

    if (error) {
        console.error('Error fetching total amount:', error)
        return 0
    }

    // `data` will return an array with the sum of 'amount'
    return data || 0
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

export async function deleteTransaction(id: number): Promise<boolean> {
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