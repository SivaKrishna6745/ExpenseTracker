import { useMemo } from 'react';
import useAppSelector from './useAppSelector';
import { type Expense } from '../types/expense';

const useFilteredExpenses = () => {
    const expenses = useAppSelector((state) => state.expenses.expenses);
    const selectedMonth = useAppSelector((state) => state.expenses.selectedMonth);

    const filteredExpenses = useMemo(
        () => expenses.filter((exp: Expense) => exp.date === selectedMonth),
        [expenses, selectedMonth]
    );

    return {
        filteredExpenses,
    };
};

export default useFilteredExpenses;
