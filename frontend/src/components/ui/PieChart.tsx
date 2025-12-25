//piechart with chart.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// ============= PIE CHART COMPONENT =============
interface PieChartProps {
    data: { name: string; value: number; color: string }[];
    title?: string;
}

const PieChart = ({ data, title }: PieChartProps) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Create new chart
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: data.map(item => item.color),
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 13,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        callbacks: {
                            label: (context) => {
                                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return ` ${context.parsed} bệnh nhân (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="w-full overflow-hidden">
            <canvas ref={chartRef} style={{ maxHeight: '100px' }}></canvas>
        </div>
    );
};

export { PieChart };