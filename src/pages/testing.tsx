import { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const MyComponent = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const config = {
            type: 'bar',
            data: {
                labels: ['Label 1', 'Label 2', 'Label 3'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [10, 20, 30],
                        backgroundColor: 'rgba(0, 123, 255, 0.8)'
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

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

export default MyComponent;