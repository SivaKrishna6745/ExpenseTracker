import { useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import MonthSelector from '../components/MonthSelector';
import useAppSelector from '../hooks/useAppSelector';
import type { Expense } from '../types/expense';
import { Plus } from 'lucide-react';
import ExpenseModal from '../components/ExpenseModal';

const expEmoji: { [key: string]: string } = {
    Travel: '🚌',
    Food: '🍔',
    Software: '💻',
};

const Expenses = () => {
    const expenses = useAppSelector((state) => state.expenses.expenses);
    // const selectedMonth = useAppSelector((state) => state.expenses.selectedMonth);
    console.log(expenses);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const handleSelectedMonth = (month: string) => {
        setSelectedMonth(month);
    };

    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const handleAddExpense = () => {
        setIsExpenseModalOpen(true);
    };

    return (
        <div className="mt-4 flex flex-col">
            <div className="mb-4">
                <MonthSelector selectedMonth={selectedMonth} onChange={handleSelectedMonth} />
            </div>
            {expenses.length === 0 ? (
                <p className="text-xl text-center text-black dark:text-white">No Expenses Found 🫥</p>
            ) : (
                expenses.map((exp: Expense) => {
                    return (
                        <ExpenseCard
                            key={exp.id}
                            title={exp.title}
                            amount={exp.amount}
                            date={exp.date}
                            category={exp.category}
                            emoji={expEmoji[exp.category]}
                        />
                    );
                })
            )}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2" onClick={handleAddExpense}>
                <button
                    type="button"
                    id="add-expense"
                    className="bg-indigo-600 text-white dark:text-slate-700 rounded-full cursor-pointer p-3 shadow-lg hover:bg-indigo-800 dark:hover:bg-indigo-400 transition-all duration-100"
                >
                    <Plus size={40} />
                </button>
                <label htmlFor="add-expense" className="text-xl cursor-pointer">
                    Add Expense
                </label>
            </div>
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={() => {
                    setIsExpenseModalOpen(false);
                }}
            />
        </div>
    );
};

export default Expenses;
