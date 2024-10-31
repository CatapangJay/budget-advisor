import { AddCategoryModel, Category } from "@/models/category-models";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Get all budgets
export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        throw error;
    }
    return data;
};

// Add a new budget
export async function addCategory(budget: AddCategoryModel): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .insert([budget]);
    if (error) {
        throw error;
    }
    return data;
};

// Edit a budget
export const editBudget = async (budget: Category) => {
    const { data, error } = await supabase
        .from('categories')
        .update(budget)
        .eq('id', budget.id)
        .select()

    if (error) {
        console.error('Error updating category:', error)
        return null
    }

    return data?.[0] || null
};

// Delete a budget
export const deleteBudget = async (id: number) => {
    const { data, error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
    if (error) {
        throw error;
    }
    return data;
};