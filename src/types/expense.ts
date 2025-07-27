export type ExpenseCategory = '' | 'Travel' | 'Food' | 'Software';

export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    notes?: string;
}
