type TooltipPayload = {
    name: string;
    value: number;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
    theme: string;
};

const CustomTooltip = ({ active, payload, label, theme }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;
    return (
        <div
            style={{
                backgroundColor: theme === 'dark' ? '#212121' : '#efefef',
                border: theme === 'dark' ? '1px solid #2f2f2f' : '1px solid #e0e0e0',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: theme === 'dark' ? '0 0 5px rgba(255, 255, 255, 0.5)' : '0 0 5px rgba(0, 0, 0, 0.5)',
            }}
        >
            <p style={{ margin: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>Category: {label}</p>
            <p style={{ margin: 0 }}>Amount: {payload[0].value.toLocaleString('en-IN')}</p>
        </div>
    );
};

export default CustomTooltip;
