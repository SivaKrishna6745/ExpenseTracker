import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type CategoryChartProps = {
    chartData: { category: string; amount: number }[];
};

const CategoryChart = ({ chartData }: CategoryChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={300} aspect={3}>
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
                <XAxis dataKey="category" tick={{ fill: '#555' }} />
                <YAxis tick={{ fill: '#555' }} />
                <Tooltip contentStyle={{ borderRadius: 8 }} />
                <Bar dataKey="amount" fill="#8884d8" barSize={40} activeBar={false} radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CategoryChart;
