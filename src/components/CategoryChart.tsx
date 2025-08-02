import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomBar from './CustomBar';

type CategoryChartProps = {
    chartData: { category: string; amount: number; fillColor: string }[];
};

const CategoryChart = ({ chartData }: CategoryChartProps) => {
    return (
        <ResponsiveContainer width="75%" height={400}>
            <BarChart
                data={chartData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                barCategoryGap="25%"
            >
                <defs>
                    {chartData.map(({ category, fillColor }) => (
                        <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={fillColor} stopOpacity={1} />
                            <stop offset="35%" stopColor={fillColor} stopOpacity={0.7} />
                            <stop offset="65%" stopColor={fillColor} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={fillColor} stopOpacity={0.1} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#3f3f3f" />
                <XAxis
                    dataKey="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#222', fontSize: 14, fontWeight: 'bold' }}
                />
                <YAxis
                    domain={[0, 'dataMax']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }}
                />
                <Tooltip content={<CustomTooltip />} />
                {chartData.map(({ category }) => (
                    <Bar
                        dataKey="amount"
                        barSize={50}
                        fill={`url(#gradient-${category})`}
                        activeBar={false}
                        isAnimationActive={true}
                        animationDuration={800}
                        shape={<CustomBar />}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CategoryChart;
