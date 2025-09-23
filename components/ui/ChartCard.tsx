import React, { useRef, useEffect } from 'react';

// Make Chart.js globally available to avoid import issues with CDN script
declare const Chart: any;

interface ChartCardProps {
    title: string;
    chartId: string;
    chartConfig: any;
    className?: string;
    height?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartId, chartConfig, className, height="160" }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current && typeof Chart !== 'undefined') {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy previous chart instance if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
                chartInstance.current = new Chart(ctx, chartConfig);
            }
        }
        
        // Cleanup function to destroy chart on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [chartConfig]); // Re-render chart only when config changes

    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow ${className}`}>
            <h4 className="font-semibold mb-2">{title}</h4>
            <canvas id={chartId} ref={chartRef} className="w-full" height={height} aria-label={`${title} chart`}></canvas>
        </div>
    );
};

export default ChartCard;