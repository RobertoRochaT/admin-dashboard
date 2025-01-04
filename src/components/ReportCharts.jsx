import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ReportCharts = ({ filter }) => {
    const [data, setData] = useState({
        series: [
            {
                name: 'Consultas al Bot',
                data: [],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
            },
            xaxis: {
                type: 'datetime',
                categories: [],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yyyy',
                },
            },
        },
    });

    const fetchBotData = async () => {
        try {
            const response = await fetch(`http://localhost:9001/api/consultas-bot?filter=${filter}`);
            const consultsData = await response.json();

            if (!Array.isArray(consultsData) || consultsData.length === 0) {
                console.warn('No data received or data is not an array');
                return;
            }

            const dates = consultsData.map((item) => item.date || null);
            const counts = consultsData.map((item) => item.count || 0);

            const validData = dates
                .map((date, index) => (date && counts[index] != null ? { date, count: counts[index] } : null))
                .filter(Boolean);

            setData({
                series: [
                    {
                        name: 'Consultas al Bot',
                        data: validData.map((item) => item.count),
                    },
                ],
                options: {
                    ...data.options,
                    xaxis: {
                        ...data.options.xaxis,
                        categories: validData.map((item) => item.date),
                    },
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchBotData();
    }, [filter]); // Actualiza los datos cada vez que el filtro cambia.

    return (
        <div>
            {data.series[0].data.length > 0 ? (
                <Chart options={data.options} series={data.series} type="area" height={350} />
            ) : (
                <p>No hay datos disponibles para mostrar el gráfico.</p>
            )}
        </div>
    );
};

export default ReportCharts;
