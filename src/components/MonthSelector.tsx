import { useDispatch } from 'react-redux';
import { setSelectedMonth } from '../features/expenses/expenseSlice';

type MonthSelectorProps = {
    selectedMonth: string;
    onChange: (month: string) => void;
    availableMonths?: [];
    variant?: 'dropdown' | 'grid';
};

const MonthSelector = ({ selectedMonth, onChange, availableMonths }: MonthSelectorProps) => {
    const dispatch = useDispatch();
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsList = availableMonths?.length ? availableMonths : allMonths;
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (monthsList.includes(e.target.value)) dispatch(setSelectedMonth(e.target.value));
        else dispatch(setSelectedMonth('jan'));
    };

    return (
        <>
            <div className="flex flex-wrap justify-center items-center flex-row gap-4">
                <label htmlFor="month-select" className="text-xl">
                    Filter expenses by month:
                </label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    // onChange={(e) => onChange(e.target.value)}
                    onChange={handleMonthChange}
                    className="bg-slate-600 text-white dark:bg-slate-300 dark:text-slate-800 outline-0 p-2 rounded-lg text-lg cursor-pointer transition-all ease-in-out duration-100 hover:bg-slate-800/70 dark:hover:bg-slate-300/70 focus:outline-none focus:ring focus:ring-amber-700"
                >
                    <option value="" disabled className="text-slate-800 opacity-50">
                        please choose a month
                    </option>
                    {monthsList.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default MonthSelector;
