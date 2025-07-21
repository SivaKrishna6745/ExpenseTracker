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
        <div className="flex gap-2" style={{ backgroundColor: color || 'transparent' }}>
            <div>
                <span>{icon}</span>
                <strong>{title}</strong>
            </div>
            <div>
                <span>{currency ?? '₹'}</span>
                <span aria-label="amount">{amount.toLocaleString()}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
