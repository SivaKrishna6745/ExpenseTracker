import type { InvoiceStatus } from '../types/invoice';

type StatusSelectProps = {
    label?: string;
    id: string;
    value: InvoiceStatus;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const StatusSelect = ({ label, id, value, onChange }: StatusSelectProps) => {
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
                    Select the status
                </option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
            </select>
        </>
    );
};

export default StatusSelect;
