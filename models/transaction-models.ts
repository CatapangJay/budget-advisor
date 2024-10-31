import { UUID } from "crypto";

export type Transaction = {
    id: UUID;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
    transaction_date: Date;
  };

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}