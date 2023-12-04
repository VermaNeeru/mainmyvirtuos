import { MutableRefObject, useEffect, useRef } from 'react';
// import Chart, { ChartConfiguration } from 'chart.js';
import { Chart, ChartConfiguration, ChartOptions, LinearScale } from 'chart.js';
// import { ChartScales } from 'chart.js';

// const chartRef = useRef<HTMLCanvasElement | null>(null);


const AnnualLeaveChart = () => {
    // const chartRef = useRef(null);
    // const chartRef1 = MutableRefObject<Null>;
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d'); // Use optional chaining
        if (!ctx) return; // Return if ctx is null or undefined
        const config = {
            type: 'bar',
            data: {
                labels: ['SL', 'CL', 'EL'],
                datasets: [
                    {
                        label: 'Leave Entitlement',
                        data: [0, 2, 8],
                        backgroundColor: 'rgba(0, 123, 255, 0.8)',
                    },
                ],
            },
            options: {
                responsive: true,
                // scales: {
                //     y: {
                //         type: 'linear', // Specify the type of scale
                //         beginAtZero: true,
                //     },
                // } as ChartScales & { y: LinearScale }, // Type assertion to define the type of scales
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

export default AnnualLeaveChart;