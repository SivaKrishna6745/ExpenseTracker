import InvoiceCard from '../components/InvoiceCard';
import useAppSelector from '../hooks/useAppSelector';
import type { Invoice } from '../types/invoice';

const Invoices = () => {
    const invoices = useAppSelector((state) => state.invoices.invoices);
    const selectedMonth = useAppSelector((state) => state.expenses.selectedMonth);
    const filteredInvoices = invoices.filter((inv: Invoice) => inv.date.startsWith(selectedMonth));

    return (
        <div className="flex flex-col rounded-lg bg-green-400 m-4">
            {filteredInvoices?.length ? (
                filteredInvoices.map((inv) => (
                    <InvoiceCard
                        key={inv.id}
                        id={inv.id}
                        amount={inv.items.reduce((acc, item) => acc + item.quantity * item.rate, 0)}
                        status={inv.status}
                        date={inv.date}
                    />
                ))
            ) : (
                <p className="text-center text-gray-600 py-4">
                    No Invoices found for <strong>{selectedMonth}</strong>
                </p>
            )}
        </div>
    );
};

export default Invoices;
