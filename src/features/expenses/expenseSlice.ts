import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types/expense';

interface ExpenseState {
    expenses: Expense[];
    selectedMonth: string;
}

const initialState: ExpenseState = {
    expenses: [],
    selectedMonth: '',
};

const expenseSlice = createSlice({
    name: 'expense',
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
            state.expenses.filter((exp: Expense) => exp.id !== action.payload);
        },
        setSelectedMonth: (state: ExpenseState, action: PayloadAction<string | ''>) => {
            state.selectedMonth = action.payload;
        },
    },
});

export const { addExpense, updateExpense, removeExpense, setSelectedMonth } = expenseSlice.actions;
export default expenseSlice.reducer;
