import useAppSelector from './useAppSelector';
import { type Invoice } from '../types/invoice';
import { useMemo } from 'react';

const useInvoiceSummary = () => {
    const invoices = useAppSelector((state) => state.invoices.invoices);
    const totalAmount = invoices.reduce((acc, inv: Invoice) => {
        const invoiceTotal = inv.items.reduce((sum, item) => sum + item.rate * item.quantity, 0);
        return acc + invoiceTotal;
    }, 0);
    const paidInvoices = useMemo(() => invoices.filter((inv: Invoice) => inv.status === 'paid'), [invoices]);
    const pendingInvoices = useMemo(() => invoices.filter((inv: Invoice) => inv.status === 'pending'), [invoices]);
    const recentInvoices = invoices.slice(0, 2);

    return {
        totalAmount,
        invoicesCount: invoices.length,
        paidCount: paidInvoices.length,
        dueCount: pendingInvoices.length,
        recentInvoices,
        lastInvoiceDate: invoices.length ? invoices[invoices.length - 1].date : null,
    };
};

export default useInvoiceSummary;
