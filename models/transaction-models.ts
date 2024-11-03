import { Category, Subcategory } from "@/constants/data";
import { UUID } from "crypto";

export type Transaction = {
    id: UUID;
    description: string;
    category: Category;
    subcategory: Subcategory;
    amount: number;
    type: TransactionType;
    transaction_date: Date;
  };

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}