import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartOptions, ChartScales } from 'chart.js';

const ExpenseDc = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration = {
            type: 'doughnut',
            data: {
                labels: ['House Keeping', 'Office Supply', 'Other'],
                datasets: [
                    {
                        label: 'Leave Entitlement',
                        data: [0, 2, 8],
                        backgroundColor: ['rgba(0, 123, 255, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        beginAtZero: true,
                    },
                } as ChartScales & { y: any },
            },
        };

        const myChart = new Chart(ctx, config);

        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div>
            <canvas ref={chartRef} id="doughnut-chart" />
        </div>
    );
};

export default ExpenseDc;
