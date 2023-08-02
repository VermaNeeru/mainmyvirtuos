import { MutableRefObject, useEffect, useRef } from 'react';
// import Chart, { ChartConfiguration } from 'chart.js';
import { Chart, ChartConfiguration, ChartOptions, ChartScales, LinearScale } from 'chart.js';

// const chartRef = useRef<HTMLCanvasElement | null>(null);


const ExpenseLineChart2 = () => {
    // const chartRef = useRef(null);
    // const chartRef1 = MutableRefObject<Null>;
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d'); // Use optional chaining
        if (!ctx) return; // Return if ctx is null or undefined
        const config = {
            type: 'bar',
            data: {
                labels: ['Umesh', 'AMS', 'Zishan', 'HR', 'Account'],
                datasets: [
                    {
                        label: 'Travel',
                        data: [1, 1, 8, 4, 3],
                        backgroundColor: 'rgba(0, 123, 255, 0.8)',
                    },
                    {
                        label: 'Food',
                        data: [0, 2, 6, 1, 7],
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    },
                    {
                        label: 'Accomodation',
                        data: [0, 2, 6, 1, 7],
                        backgroundColor: 'rgba(75, 192, 2, 0.8)',
                    },
                    {
                        label: 'Other',
                        data: [0, 2, 6, 1, 7],
                        backgroundColor: 'rgba(75, 192, 192, 2.8)',
                    },

                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear', // Specify the type of scale
                        beginAtZero: true,
                    },
                } as ChartScales & { y: LinearScale }, // Type assertion to define the type of scales
            },
        } as ChartConfiguration;
        const myChart = new Chart(ctx, config);

        return () => {
            // Clean up the chart instance when the component is unmounted
            myChart.destroy();
        };
    }, []);

    return (
        <div>
            <canvas ref={chartRef} id="bar-chart" />
        </div>
    );
};

export default ExpenseLineChart2;