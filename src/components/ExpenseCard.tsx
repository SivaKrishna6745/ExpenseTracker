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
    onEdit: () => void;
};

const ExpenseCard = ({ id, title, amount, date, category, emoji, onEdit }: ExpenseCardProps) => {
    const dispatch = useDispatch();
    const currency = useAppSelector((state) => state.settings.settings.currency);
    const deleteExpense = (id: string) => {
        dispatch(removeExpense(id));
    };

    return (
        <>
            <div className="flex justify-between items-center text-lg gap-2 bg-red-300 rounded-lg p-3 my-3 mx-2">
                <span>{title}</span>
                <span aria-label="amount">
                    {currency ?? '₹'} {amount}
                </span>
                <span aria-label="date">{date}</span>
                <span>
                    {emoji} {category}
                </span>
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
            </div>
        </>
    );
};

export default ExpenseCard;
