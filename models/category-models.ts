export type Category = {
    id: number;
    name: string;
  };

export type AddCategoryModel = Omit<Category, 'id'>;

export type SubCategory = {
    id: number;
    name: string;
    due_at: Date;
    category: Category;
  };

export type AddSubCategoryModel = Omit<SubCategory, 'id'>;