import { FilePenLine, FileX2 } from 'lucide-react';
import useAppSelector from '../hooks/useAppSelector';
import type { ExpenseCategory } from '../types/expense';
import { useDispatch } from 'react-redux';
import { removeExpense } from '../features/expenses/expenseSlice';

type ExpenseCardProps = {
    id: string;
    title: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
    emoji?: string;
    onEdit?: () => void;
    dashboard?: boolean;
};

const ExpenseCard = ({ id, title, amount, date, category, emoji, onEdit, dashboard }: ExpenseCardProps) => {
    const dispatch = useDispatch();
    const currency = useAppSelector((state) => state.settings.settings.currency);
    const deleteExpense = (id: string) => {
        dispatch(removeExpense(id));
    };

    return (
        <>
            <div className="flex justify-between items-center text-lg bg-rose-400 text-black dark:text-white rounded-lg p-3 my-3">
                <span>{title}</span>
                <span aria-label="amount">
                    {currency ?? '₹'} {amount}
                </span>
                <span aria-label="date">{date}</span>
                <span>
                    {emoji} {category}
                </span>
                {dashboard ? (
                    ''
                ) : (
                    <div className="flex gap-2">
                        <button
                            className="bg-blue-600 text-slate-300 p-2 rounded-lg flex gap-2 cursor-pointer"
                            onClick={onEdit}
                        >
                            <FilePenLine />
                            Edit Expense
                        </button>
                        <button
                            className="bg-red-600 text-slate-300 p-2 rounded-lg flex gap-2 cursor-pointer"
                            onClick={() => deleteExpense(id)}
                        >
                            <FileX2 />
                            Delete Expense
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ExpenseCard;
