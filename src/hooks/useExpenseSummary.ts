import type { Expense } from '../types/expense';
import useAppSelector from './useAppSelector';

const useExpenseSummary = () => {
    const expenses = useAppSelector((state) => state.expenses.expenses);
    const totalExpenseAmount = expenses.reduce((acc: number, exp: Expense) => {
        return acc + exp.amount;
    }, 0);
    const recentExpenses = expenses.slice(0, 2);

    return {
        totalExpenseAmount,
        expensesCount: expenses.length,
        recentExpenses,
    };
};

export default useExpenseSummary;
