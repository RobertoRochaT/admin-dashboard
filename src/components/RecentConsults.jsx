import React, { useState, useEffect } from 'react';
import './recentconsults.css';
import CardFilter from './CardFilter';
import RecentSalesTable from './RecentConsultsTable';
import axios from 'axios';

const RecentSales = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('Today');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Mostrar 10 consultas por página

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/recentConsults/bigquery', {
          withCredentials: true, // Permitir envío de cookies y credenciales
        });
        console.log(response.data);

        // Ordenar los datos por la fecha más reciente al inicio usando request_time
        const sortedData = [...response.data].sort(
          (a, b) => new Date(b.request_time) - new Date(a.request_time)
        );

        setItems(sortedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calcular los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="card recent-sales overflow-auto">
      <div className="card-body">
        <h5 className="card-title">
          Recent Consults
        </h5>
        <RecentSalesTable items={currentItems} />
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSales;