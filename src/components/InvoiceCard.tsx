import { FilePenLine, FileX2 } from 'lucide-react';
import type { ReactNode } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { removeInvoice, updateInvoice } from '../features/invoices/invoiceSlice';

type InvoiceCardProps = {
    id: string;
    amount: number;
    date: string;
    currency?: string;
    icon?: ReactNode;
    onEdit: () => void;
};

const statusColorMap = {
    paid: 'bg-green-500',
    pending: 'bg-red-500',
    draft: 'bg-gray-500',
};

const InvoiceCard = ({ id, amount, date, currency, icon, onEdit }: InvoiceCardProps) => {
    const dispatch = useDispatch();
    const deleteInvoice = (id: string) => {
        dispatch(removeInvoice(id));
    };

    return (
        <>
            <div className="p-4 flex justify-between items-center font-semibold">
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
                </div>
                <div className="flex gap-2">
                    <button
                        className="bg-blue-600 text-slate-300 p-2 rounded-lg flex gap-2 cursor-pointer"
                        onClick={onEdit}
                    >
                        <FilePenLine />
                        Edit Invoice
                    </button>
                    <button
                        className="bg-red-600 text-slate-300 p-2 rounded-lg flex gap-2 cursor-pointer"
                        onClick={() => deleteInvoice(id)}
                    >
                        <FileX2 />
                        Delete Invoice
                    </button>
                </div>
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />
        </>
    );
};

export default InvoiceCard;
