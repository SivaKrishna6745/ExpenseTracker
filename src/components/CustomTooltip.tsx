type TooltipPayload = {
    name: string;
    value: number;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    return (
        <div
            style={{
                backgroundColor: '#efefef',
                border: '1px solid #e0e0e0',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
            }}
        >
            <p style={{ margin: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>Category: {label}</p>
            <p style={{ margin: 0 }}>Amount: {payload[0].value.toLocaleString('en-IN')}</p>
        </div>
    );
};

export default CustomTooltip;
