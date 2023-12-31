import React from 'react'
import Chart from "chart.js";

export default function Leavechart() {
    React.useEffect(() => {
        let config = {
            type: "bar",
            data: {
                labels: [
                    "SL",
                    "CL",
                    "EL",

                ],
                datasets: [
                    {
                        label: new Date().getFullYear(),
                        backgroundColor: "#BCB1B2",
                        borderColor: "#BCB1B2",
                        data: [30, 78, 56, 34, 100, 45, 13],
                        fill: false,
                        barThickness: 8,
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: "rgb(232,67,106)",
                        borderColor: "rgb(232,67,106)",
                        data: [27, 68, 86, 74, 10, 4, 87],
                        barThickness: 8,
                    },
                    {
                        label: new Date().getFullYear() - 1,
                        fill: false,
                        backgroundColor: "rgb(255,0,0)",
                        borderColor: "rgb(255,0,0)",
                        data: [27, 68, 86, 74, 10, 4, 87],
                        barThickness: 8,
                    },

                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Orders Chart",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                legend: {
                    labels: {
                        fontColor: "rgba(0,0,0,.4)",
                    },
                    align: "end",
                    position: "bottom",
                },
                scales: {
                    xAxes: [
                        {
                            display: false,
                            scaleLabel: {
                                display: true,
                                labelString: "Month",
                            },
                            gridLines: {
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                            },
                            gridLines: {
                                borderDash: [2],
                                drawBorder: false,
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.2)",
                                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        // let ctx = document.getElementById("bar-chart").getContext("2d");
        // window.myBar = new Chart(ctx, config);
    }, []);

    return (

        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Annual Leave Balance for 2023
                        </h2>
                        <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Annual Leave Balance
                        </h6>
                    </div>
                </div>
            </div>
            {/* Chart */}
            <canvas id="bar-chart"></canvas>
        </div>

    )
}
