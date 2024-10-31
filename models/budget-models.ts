export type Budget = {
  id: number;
  name: string;
  allocation: number;
}

export type AddBudgetModel = Omit<Budget, 'id'>;
