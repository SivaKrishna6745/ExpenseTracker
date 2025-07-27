import type { ExpenseCategory } from '../types/expense';
import type { InvoiceStatus } from '../types/invoice';

type SelectOption = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    label?: string;
    id: string;
    value: InvoiceStatus | ExpenseCategory;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
};

const CustomSelect = ({ label, id, value, onChange, options }: CustomSelectProps) => {
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                className="border-b-2 border-cyan-300 py-2 outline-0"
                value={value}
                onChange={(e) => onChange(e)}
            >
                <option value="" disabled>
                    Select the {label === 'Status' ? 'status' : 'category'}
                </option>
                {options.map((eachOption) => {
                    return <option value={eachOption.value}>{eachOption.label}</option>;
                })}
            </select>
        </>
    );
};

export default CustomSelect;
