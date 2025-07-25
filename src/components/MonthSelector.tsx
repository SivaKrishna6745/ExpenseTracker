type MonthSelectorProps = {
    selectedMonth: string;
    onChange: (month: string) => void;
    availableMonths?: [];
    variant?: 'dropdown' | 'grid';
};

const MonthSelector = ({ selectedMonth, onChange, availableMonths }: MonthSelectorProps) => {
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsList = availableMonths?.length ? availableMonths : allMonths;
    return (
        <>
            <div className="flex justify-center items-center flex-row gap-2">
                <label htmlFor="month-select">Select a Month:</label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-amber-700 dark:bg-amber-300 outline-0 p-2 rounded-lg"
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
