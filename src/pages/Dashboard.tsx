import useFilteredExpenses from '../hooks/useFilteredExpenses';
import useInvoiceSummary from '../hooks/useInvoiceSummary';
import useSettings from '../hooks/useSettings';
import SummaryCard from '../components/SummaryCard';
import { FileText, Currency } from 'lucide-react';
import CategoryChart from '../components/CategoryChart';
import type { Expense, ExpenseCategory } from '../types/expense';
import useExpenseSummary from '../hooks/useExpenseSummary';
import ExpenseCard from '../components/ExpenseCard';
import type { Invoice, InvoiceStatus } from '../types/invoice';
import InvoiceCard from '../components/InvoiceCard';

const expenseCategories: ExpenseCategory[] = ['travel', 'food', 'software'];
const invoiceStatuses: InvoiceStatus[] = ['paid', 'pending', 'draft'];

const Dashboard = () => {
    const { totalAmount, invoicesCount, recentInvoices } = useInvoiceSummary();
    const { totalExpenseAmount, expensesCount, recentExpenses } = useExpenseSummary();
    const { currency } = useSettings();
    const { filteredExpenses } = useFilteredExpenses();
    let filteredExpenseCategories: ExpenseCategory[] = [];

    const catergoryTotals: { [key: string]: number } = {};
    filteredExpenses.forEach((exp: Expense) => {
        filteredExpenseCategories.push(exp.category);
        if (catergoryTotals[exp.category]) {
            catergoryTotals[exp.category] += exp.amount;
        } else {
            catergoryTotals[exp.category] = exp.amount;
        }
    });
    const missingExpenseCategories: ExpenseCategory[] = expenseCategories.filter(
        (exp) => !filteredExpenseCategories.includes(exp)
    );
    missingExpenseCategories.map((exp) => {
        catergoryTotals[exp] = 1;
    });

    const chartData = Object.entries(catergoryTotals).map(([category, amount]) => ({
        category,
        amount,
        fillColor: amount === 1 ? 'rgba(100, 100, 100, 0.1)' : '#8884d8',
    }));

    let filteredInvoicesStatusesCount: InvoiceStatus[] = [];
    const invoicesStatusesCount: { [key: string]: number } = {};
    recentInvoices.forEach((inv: Invoice) => {
        filteredInvoicesStatusesCount.push(inv.status);
        if (invoicesStatusesCount[inv.status]) {
            invoicesStatusesCount[inv.status] += 1;
        } else {
            invoicesStatusesCount[inv.status] = 1;
        }
    });
    const missingInvoiceStatuses: InvoiceStatus[] = invoiceStatuses.filter(
        (inv) => !filteredInvoicesStatusesCount.includes(inv)
    );
    missingInvoiceStatuses.map((inv) => {
        invoicesStatusesCount[inv] = 0;
    });
    const invoiceChartData = Object.entries(invoicesStatusesCount).map(([status, count]) => ({
        category: status,
        amount: count,
        fillColor: count === 1 ? 'rgba(100, 100, 100, 0.1)' : '#93d5b0',
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
            <div className="grid grid-flow-col grid-cols-2 gap-4">
                <div className="mb-4 flex flex-col gap-4">
                    {recentExpenses.length > 0 ? <h2 className="text-xl mb-4 font-semibold">Recent Expenses</h2> : ''}
                    {recentExpenses.map((exp: Expense) => (
                        <div className="-my-3">
                            <ExpenseCard
                                key={exp.id}
                                id={exp.id}
                                title={exp.title}
                                amount={exp.amount}
                                date={exp.date}
                                category={exp.category}
                                dashboard
                            />
                        </div>
                    ))}
                    <CategoryChart chartData={chartData} />
                </div>
                <div className="mb-4 flex flex-col gap-4">
                    {recentInvoices.length > 0 ? <h2 className="text-xl mb-4 font-semibold">Recent Invoices</h2> : ''}
                    {recentInvoices.map((inv: Invoice) => (
                        <div key={inv.id} className="bg-blue-500 rounded-lg">
                            <InvoiceCard
                                id={inv.id}
                                amount={inv.items.reduce((acc, item) => acc + item.quantity * item.rate, 0)}
                                date={inv.date}
                                currency={currency}
                                dashboard
                            />
                        </div>
                    ))}
                    <CategoryChart chartData={invoiceChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
