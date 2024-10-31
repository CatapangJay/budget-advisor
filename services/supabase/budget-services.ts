import { AddBudgetModel, Budget } from "@/models/budget-models";
import { createClient } from "@/utils/supabase/client";
import { UUID } from "crypto";

const supabase = createClient();

// Get all budgets
export async function getBudgets(): Promise<Budget[]> {
    const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        throw error;
    }
    return data;
};

// Add a new budget
export async function addBudget(budget: AddBudgetModel): Promise<Budget | null> {
    const { data, error } = await supabase
        .from('budgets')
        .insert([budget]);
    if (error) {
        throw error;
    }
    return data;
};

// Edit a budget
export const editBudget = async (budget: Budget) => {
    const { data, error } = await supabase
        .from('budgets')
        .update(budget)
        .eq('id', budget.id)
        .select()

    if (error) {
        console.error('Error updating budget:', error)
        return null
    }

    return data?.[0] || null
};

// Delete a budget
export const deleteBudget = async (id: UUID) => {
    const { data, error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);
    if (error) {
        throw error;
    }
    return data;
};