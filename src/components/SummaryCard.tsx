import type { ReactNode } from 'react';

type SummaryCardProps = {
    title: string;
    amount: number;
    currency?: string;
    icon?: ReactNode;
    className: string;
};

const SummaryCard = ({ title, amount, currency, icon, className }: SummaryCardProps) => {
    return (
        <div className={`p-4 rounded-2xl flex justify-evenly items-center gap-2 shadow-md summary ${className}`}>
            <div className="flex gap-2">
                <span>{icon}</span>
                <strong>{title}</strong>
            </div>
            <div className="font-semibold text-2xl">
                <span>{currency ?? '₹'} </span>
                <span aria-label="amount">{amount.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
