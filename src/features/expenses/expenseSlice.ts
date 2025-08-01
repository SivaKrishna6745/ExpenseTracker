import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types/expense';

export interface ExpenseState {
    expenses: Expense[];
    selectedExpenseId: string | null;
    selectedMonth: string;
}

const initialState: ExpenseState = {
    expenses: [],
    selectedExpenseId: null,
    selectedMonth: '',
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state: ExpenseState, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        updateExpense: (state: ExpenseState, action: PayloadAction<Expense>) => {
            const idx = state.expenses.findIndex((exp: Expense) => exp.id === action.payload.id);
            if (idx !== -1) state.expenses[idx] = action.payload;
        },
        removeExpense: (state: ExpenseState, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((exp: Expense) => exp.id !== action.payload);
        },
        selectExpense: (state: ExpenseState, action: PayloadAction<string>) => {
            state.selectedExpenseId = action.payload;
        },
        setSelectedMonth: (state: ExpenseState, action: PayloadAction<string | ''>) => {
            state.selectedMonth = action.payload;
        },
    },
});

export const { addExpense, updateExpense, removeExpense, selectExpense, setSelectedMonth } = expenseSlice.actions;
export default expenseSlice.reducer;
