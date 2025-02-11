import React, { useState } from 'react';
import CardFilter from './CardFilter';
import ReportCharts from './ReportCharts';

const Reports = () => {
    const [filter, setFilter] = useState('All');
    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    return (
        <div className="card">
            <CardFilter filterChange={handleFilterChange} />
            <div className="card-body">
                <h5 className="card-title">
                    Reports <span> | {filter}</span>
                </h5>
                <ReportCharts filter={filter} />
            </div>
        </div>
    );
};

export default Reports;
