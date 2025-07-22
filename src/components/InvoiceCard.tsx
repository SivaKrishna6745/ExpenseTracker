import type { ReactNode } from 'react';

type InvoiceCardProps = {
    id: string;
    amount: number;
    status: 'paid' | 'pending' | 'draft';
    date: string;
    currency?: string;
    icon?: ReactNode;
};

const statusColorMap = {
    paid: 'bg-green-500',
    pending: 'bg-red-500',
    draft: 'bg-gray-500',
};

const InvoiceCard = ({ id, amount, status, date, currency, icon }: InvoiceCardProps) => {
    return (
        <div className={`flex justify-between ${statusColorMap[status]}`}>
            <div>
                <span>{icon}</span>
            </div>
            <div>
                <span aria-label="date">{date}</span>
            </div>
            <div>
                <span aria-label="amount">
                    {currency ?? '₹'}
                    {amount.toLocaleString()}
                </span>
                <span>{status}</span>
            </div>
        </div>
    );
};

export default InvoiceCard;
