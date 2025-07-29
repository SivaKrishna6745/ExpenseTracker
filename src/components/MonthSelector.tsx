import { useDispatch } from 'react-redux';
import { setSelectedMonth } from '../features/expenses/expenseSlice';

type MonthSelectorProps = {
    selectedMonth: string;
    availableMonths?: [];
    variant?: 'dropdown' | 'grid';
};

const MonthSelector = ({ selectedMonth, availableMonths }: MonthSelectorProps) => {
    const dispatch = useDispatch();
    const allMonths = [
        { mon: '01', month: 'Jan' },
        { mon: '02', month: 'Feb' },
        { mon: '03', month: 'Mar' },
        { mon: '04', month: 'Apr' },
        { mon: '05', month: 'May' },
        { mon: '06', month: 'Jun' },
        { mon: '07', month: 'Jul' },
        { mon: '08', month: 'Aug' },
        { mon: '09', month: 'Sep' },
        { mon: '10', month: 'Oct' },
        { mon: '11', month: 'Nov' },
        { mon: '12', month: 'Dec' },
    ];
    const monthsList = availableMonths?.length ? availableMonths : allMonths;
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (monthsList.some((month) => month.mon === e.target.value)) dispatch(setSelectedMonth(e.target.value));
        else dispatch(setSelectedMonth('01'));
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
                    onChange={handleMonthChange}
                    className="outline-0 text-lg w-sm py-2 pb-1.5 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-b-3 border-gray-500 dark:border-slate-200 cursor-pointer tracking-wide"
                >
                    <option value="" disabled className="text-slate-800 opacity-50">
                        FIlter by month
                    </option>
                    {monthsList.map((month) => (
                        <option key={month.mon} value={month.mon}>
                            {month.month}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default MonthSelector;
