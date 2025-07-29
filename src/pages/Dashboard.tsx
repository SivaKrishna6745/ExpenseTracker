import useFilteredExpenses from '../hooks/useFilteredExpenses';
import useInvoiceSummary from '../hooks/useInvoiceSummary';
import useSettings from '../hooks/useSettings';
import SummaryCard from '../components/SummaryCard';
import { FileText, Currency } from 'lucide-react';
import CategoryChart from '../components/CategoryChart';
import type { Expense } from '../types/expense';
import useExpenseSummary from '../hooks/useExpenseSummary';
import ExpenseCard from '../components/ExpenseCard';
import type { Invoice } from '../types/invoice';
import InvoiceCard from '../components/InvoiceCard';

const Dashboard = () => {
    const { totalAmount, invoicesCount, recentInvoices } = useInvoiceSummary();
    const { totalExpenseAmount, expensesCount, recentExpenses } = useExpenseSummary();
    const { currency } = useSettings();
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

    return (
        <div className="mx-4 my-2">
            <div className="my-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <SummaryCard
                        title="Invoices Total"
                        amount={totalAmount}
                        currency={currency}
                        icon={<Currency />}
                        className="inv-total"
                    />
                    <SummaryCard
                        title="Number of Invoices"
                        amount={invoicesCount}
                        currency=""
                        icon={<FileText />}
                        className="inv-no"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <SummaryCard
                        title="Expenses Total"
                        amount={totalExpenseAmount}
                        currency={currency}
                        icon={<Currency />}
                        className="exp-total"
                    />
                    <SummaryCard
                        title="Number of Expenses"
                        amount={expensesCount}
                        currency=""
                        icon={<FileText />}
                        className="exp-no"
                    />
                </div>
            </div>
            <div className="mb-4">
                {recentExpenses.length > 0 ? <h2 className="text-xl mb-4 font-semibold">Recent Expenses</h2> : ''}
                {recentExpenses.map((exp: Expense) => (
                    <ExpenseCard
                        key={exp.id}
                        id={exp.id}
                        title={exp.title}
                        amount={exp.amount}
                        date={exp.date}
                        category={exp.category}
                        dashboard
                    />
                ))}
            </div>
            <div className="mb-4">
                {recentInvoices.length > 0 ? <h2 className="text-xl mb-4 font-semibold">Recent Invoices</h2> : ''}
                {recentInvoices.map((inv: Invoice) => (
                    <div className="bg-blue-500 rounded-lg mb-3">
                        <InvoiceCard
                            key={inv.id}
                            id={inv.id}
                            amount={inv.items.reduce((acc, item) => acc + item.quantity * item.rate, 0)}
                            date={inv.date}
                            currency={currency}
                            dashboard
                        />
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <CategoryChart chartData={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
