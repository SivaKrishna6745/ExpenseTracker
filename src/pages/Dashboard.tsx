import useAppDispatch from '../hooks/useAppDispatch';
import useFilteredExpenses from '../hooks/useFilteredExpenses';
import useInvoiceSummary from '../hooks/useInvoiceSummary';
import useSettings from '../hooks/useSettings';
import SummaryCard from '../components/SummaryCard';
import { FileText, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import CategoryChart from '../components/CategoryChart';
import type { Expense } from '../types/expense';
import MonthSelector from '../components/MonthSelector';
import { useState } from 'react';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { totalAmount, invoicesCount, paidCount, dueCount } = useInvoiceSummary();
    const { theme, currency } = useSettings();
    const { filteredExpenses } = useFilteredExpenses();

    const catergoryTotals: { [key: string]: number } = {};
    filteredExpenses.forEach((exp: Expense) => {
        if (catergoryTotals[exp.category]) {
            catergoryTotals[exp.category] += exp.amount;
        } else {
            catergoryTotals[exp.category] = exp.amount;
        }
    });

    const chartData = Object.entries(catergoryTotals).map(([category, amount]) => ({
        category,
        amount,
    }));

    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const handleSelectedMonth = (month: string) => {
        setSelectedMonth(month);
    };

    return (
        <div className="mx-4 my-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title="Total Invoices"
                    amount={totalAmount}
                    currency={currency}
                    icon={<FileText />}
                    color="#5f5f5f"
                />
                <SummaryCard
                    title="Invoices Paid"
                    amount={paidCount}
                    currency=""
                    icon={<CheckCircle />}
                    color="#d17a65"
                />
                <SummaryCard
                    title="Invoices Due"
                    amount={dueCount}
                    currency=""
                    icon={<AlertCircle />}
                    color="#b49f7f"
                />
                <SummaryCard
                    title="Monthly Expenses"
                    amount={filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0)}
                    currency={currency}
                    icon={<Wallet />}
                    color="#c0b2ef"
                />
            </div>
            <div className="mb-4">
                <CategoryChart chartData={chartData} />
            </div>
            <div className="mb-4">
                <MonthSelector selectedMonth={selectedMonth} onChange={handleSelectedMonth} />
            </div>
        </div>
    );
};

export default Dashboard;
