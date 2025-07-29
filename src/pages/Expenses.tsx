import { useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import MonthSelector from '../components/MonthSelector';
import useAppSelector from '../hooks/useAppSelector';
import type { Expense } from '../types/expense';
import { Plus } from 'lucide-react';
import ExpenseModal from '../components/ExpenseModal';
import { useDispatch } from 'react-redux';
import { addExpense, selectExpense, setSelectedMonth } from '../features/expenses/expenseSlice';

const expEmoji: { [key: string]: string } = {
    Travel: '🚌',
    Food: '🍔',
    Software: '💻',
};

const getMonthName = (mon: string) => {
    const map: { [key: string]: string } = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };
    return map[mon] || 'All months';
};

const Expenses = () => {
    const dispatch = useDispatch();
    const expenses = useAppSelector((state) => state.expenses.expenses);
    const selectedMonth = useAppSelector((state) => state.expenses.selectedMonth);
    const filteredExpenses = expenses.filter((exp: Expense) => {
        const month = exp.date.split('-')[1];
        return selectedMonth ? selectedMonth === month : true;
    });
    const clearFilter = () => {
        dispatch(setSelectedMonth(''));
    };

    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const selectedExpId = useAppSelector((state) => state.expenses.selectedExpenseId);
    const selectedExp = useAppSelector((state) =>
        state.expenses.expenses.find((exp: Expense) => exp.id === selectedExpId)
    );

    const handleFormSubmit = (data: Expense) => {
        dispatch(addExpense(data));
    };

    return (
        <div className="mt-4 flex flex-col">
            <div className="mb-4 flex justify-center gap-12">
                <MonthSelector selectedMonth={selectedMonth} />
                <button
                    className="bg-gray-400 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 py-2 px-4 text-lg rounded-lg cursor-pointer"
                    onClick={clearFilter}
                >
                    Clear Filter
                </button>
            </div>
            {filteredExpenses.length === 0 ? (
                <p className="text-2xl text-center text-black dark:text-white">
                    {selectedMonth ? (
                        <>
                            No Expenses found for the month of{' '}
                            <span className="font-bold">{getMonthName(selectedMonth)}</span> 🫥
                        </>
                    ) : (
                        'No Expenses Found 🫥'
                    )}
                </p>
            ) : (
                <div>
                    {selectedMonth ? (
                        <h2 className="text-xl text-center my-4">
                            Showing Expenses for <span className="font-bold">{getMonthName(selectedMonth)}</span>
                        </h2>
                    ) : (
                        ''
                    )}
                    {filteredExpenses.map((exp: Expense) => {
                        return (
                            <ExpenseCard
                                key={exp.id}
                                id={exp.id}
                                title={exp.title}
                                amount={exp.amount}
                                date={exp.date}
                                category={exp.category}
                                emoji={expEmoji[exp.category]}
                                onEdit={() => {
                                    dispatch(selectExpense(exp.id));
                                    setIsEditMode(true);
                                    setIsExpenseModalOpen(true);
                                }}
                            />
                        );
                    })}
                </div>
            )}
            <div
                className="fixed bottom-24 right-24 z-50 flex flex-col items-center gap-2"
                onClick={() => setIsExpenseModalOpen(true)}
            >
                <button
                    type="button"
                    id="add-expense"
                    className="bg-blue-300 text-gray-800 dark:bg-gray-700 dark:text-blue-300 rounded-full cursor-pointer p-3 shadow-lg hover:bg-blue-400 dark:hover:bg-gray-800 transition-all duration-100"
                >
                    <Plus size={40} />
                </button>
                <label htmlFor="add-expense" className="text-xl cursor-pointer">
                    Add Expense
                </label>
            </div>
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onSubmit={(data) => handleFormSubmit(data)}
                onClose={() => {
                    setIsExpenseModalOpen(false);
                }}
                isEdit={isEditMode}
                selectedExp={selectedExp}
            />
        </div>
    );
};

export default Expenses;
