type ModalInputProps = {
    label?: string;
    type: string;
    id?: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

const ModalInput = ({ label, type, id, placeholder, value, onChange, className }: ModalInputProps) => {
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
                className={`border-b-2 border-cyan-300 py-2 outline-0 ${className}`}
            />
        </>
    );
};

export default ModalInput;
