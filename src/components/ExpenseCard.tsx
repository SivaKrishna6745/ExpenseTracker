import useAppSelector from '../hooks/useAppSelector';
import type { ExpenseCategory } from '../types/expense';

type ExpenseCardProps = {
    title: string;
    amount: number;
    date: string;
    category: ExpenseCategory;
    emoji?: string;
};

const ExpenseCard = ({ title, amount, date, category, emoji }: ExpenseCardProps) => {
    const currency = useAppSelector((state) => state.settings.settings.currency);

    return (
        <div className="flex justify-between items-center text-lg gap-2 bg-red-300 rounded-lg p-3 my-3 mx-2">
            <span>{title}</span>
            <span aria-label="amount">
                {currency ?? '₹'} {amount}
            </span>
            <span aria-label="date">{date}</span>
            <span>
                {emoji} {category}
            </span>
        </div>
    );
};

export default ExpenseCard;
