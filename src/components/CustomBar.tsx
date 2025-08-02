type CustomBarProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
};

const CustomBar = ({ x, y, width, height, fill }: CustomBarProps) => {
    if (height && height <= 1) return <rect x={x} y={y} width={width} height={5} fill="rgba(100, 100, 100)" />;
    return <rect rx={10} ry={10} x={x} y={y} width={width} height={height} fill={fill} />;
};

export default CustomBar;
