type InvoiceModalInputProps = {
    label?: string;
    type: string;
    id?: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InvoiceModalInput = ({ label, type, id, placeholder, value, onChange }: InvoiceModalInputProps) => {
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                className="border-b-2 border-cyan-300 py-2 outline-0"
            />
        </>
    );
};

export default InvoiceModalInput;
