import type { ReactNode } from 'react';

type SummaryCardProps = {
    title: string;
    amount: number;
    currency?: string;
    icon?: ReactNode;
    color?: string;
};

const SummaryCard = ({ title, amount, currency, icon, color }: SummaryCardProps) => {
    return (
        <div
            className="p-4 rounded-lg flex justify-evenly items-center gap-2"
            style={{ backgroundColor: color || 'transparent' }}
        >
            <div className="flex gap-2">
                <span>{icon}</span>
                <strong>{title}</strong>
            </div>
            <div className="text-xl font-semibold">
                <span>{currency ?? '₹'} </span>
                <span aria-label="amount">{amount.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
