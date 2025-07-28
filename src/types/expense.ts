export type ExpenseCategory = '' | 'travel' | 'food' | 'software';

export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    notes?: string;
}
