import { ClipboardList, FilePlus2 } from 'lucide-react';
import InvoiceCard from '../components/InvoiceCard';
import useAppSelector from '../hooks/useAppSelector';
import type { Invoice } from '../types/invoice';
import { useState } from 'react';
import InvoiceModal from '../components/InvoiceModal';
import { useDispatch } from 'react-redux';
import { addInvoice, selectInvoice } from '../features/invoices/invoiceSlice';

const statusColorMap: { [key: string]: string } = {
    paid: 'bg-green-300',
    pending: 'bg-red-300',
    draft: 'bg-gray-300',
};

const Invoices = () => {
    const dispatch = useDispatch();
    const invoices = useAppSelector((state) => state.invoices.invoices);
    console.log('invoices', invoices);
    const selectedMonth = useAppSelector((state) => state.expenses.selectedMonth);
    const curreny = useAppSelector((state) => state.settings.settings.currency);

    const filteredInvoices = invoices.filter((inv: Invoice) => inv.date.startsWith(selectedMonth));
    const invoiceCategory: {
        [key: string]: {
            invoices: Invoice[];
            amount: number;
        };
    } = {};
    filteredInvoices.forEach((inv: Invoice) => {
        const invAmount = inv.items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
        if (!invoiceCategory[inv.status]) {
            invoiceCategory[inv.status] = { invoices: [], amount: 0 };
        }
        invoiceCategory[inv.status].invoices.push(inv);
        invoiceCategory[inv.status].amount += invAmount;
    });

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleFormSubmit = (data: Invoice) => {
        dispatch(addInvoice(data));
        setModalOpen(false);
    };

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const selectedInvId = useAppSelector((state) => state.invoices.selectedInvoiceId);
    const selectedInv = useAppSelector((state) =>
        state.invoices.invoices.find((inv: Invoice) => inv.id === selectedInvId)
    );

    return (
        <div className="flex flex-col m-4">
            <div className="flex items-center justify-between cursor-pointer">
                <h2 className="text-2xl">Invoices</h2>
                <button
                    className="bg-green-600 text-slate-200 px-3 py-2 rounded-lg cursor-pointer text-md font-semibold flex gap-2 justify-center items-center"
                    onClick={() => setModalOpen(true)}
                >
                    <FilePlus2 />
                    Add Invoice
                </button>
                <InvoiceModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        if (isEditMode) setIsEditMode(false);
                        dispatch(selectInvoice(null));
                    }}
                    invoice={undefined}
                    onSubmit={(data) => handleFormSubmit(data)}
                    isEdit={isEditMode}
                    selectedInv={selectedInv}
                />
            </div>
            {filteredInvoices?.length ? (
                Object.entries(invoiceCategory).map(([status, invoices], idx) => (
                    <div key={idx} className="my-4 flex flex-col gap-2">
                        <div className="px-3 py-1 rounded-full bg-red-200 text-red-800 text-sm font-semibold w-max">
                            {status
                                .toLowerCase()
                                .split(' ')
                                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}{' '}
                            Invoices
                        </div>
                        <div className={`rounded-lg ${statusColorMap[status]}`}>
                            <>
                                {invoices.invoices.map((inv: Invoice) => (
                                    <InvoiceCard
                                        key={inv.id}
                                        id={inv.id}
                                        amount={inv.items.reduce((sum, item) => sum + item.rate * item.quantity, 0)}
                                        date={inv.date}
                                        icon={<ClipboardList size={20} className="text-gray-800" />}
                                        onEdit={() => {
                                            dispatch(selectInvoice(inv.id));
                                            setIsEditMode(true);
                                            setModalOpen(true);
                                        }}
                                        currency={curreny}
                                    />
                                ))}
                                <div className="flex justify-end mr-4 text-sm font-semibold tracking-wide uppercase px-3 py-2">
                                    {status
                                        .toLowerCase()
                                        .split(' ')
                                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}{' '}
                                    Total: {curreny} {invoices.amount}
                                </div>
                            </>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600 py-4">No Invoices found</p>
            )}
        </div>
    );
};

export default Invoices;
