import { MutableRefObject, useEffect, useRef } from 'react';
// import { Chart, ChartConfiguration, ChartOptions, ChartScales, LinearScale } from 'chart.js';
import { Chart, ChartConfiguration, ChartOptions, LinearScale } from 'chart.js';

const MonthlyExpenseChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration = {
            type: 'line', // Use 'line' for a Line chart
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Expenses',
                        data: [0, 2],
                        borderColor: 'rgba(0, 123, 255, 0.8)', // Set the line color
                        backgroundColor: ['rgba(0, 123, 255, 0.2)', 'rgba(0, 13, 55, 0.2)'], // Set the area fill color under the line
                        fill: true, // Fill the area under the line
                    },
                ],
            }
            // options: {
            //     responsive: true,
            //     scales: {
            //         y: {
            //             type: 'linear',
            //             beginAtZero: true,
            //         },
            //     } as ChartScales & { y: LinearScale },
            // },
        };

        const myChart = new Chart(ctx, config);

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Monthly Expense Report
                        </h2>

                    </div>
                </div>
            </div>
            <canvas ref={chartRef} id="line-chart" />
        </div>
    );
};

export default MonthlyExpenseChart;
