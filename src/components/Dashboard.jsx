import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Card from './Card';
import axios from 'axios';
import Reports from './Reports';
import RecentSales from './RecentConsults';

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const BigDataFetch = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/recentConsults/bigquery', {
          withCredentials: true,
        });
        console.log(response.data);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    BigDataFetch();
  }, []);

  // Conditionally map only if cards are not empty
  const mostAskedQuery = cards.length > 0 ? cards.map((card) => card.request.queryInput.text.text) : [];

  // Now that you have a safe array, proceed with counting queries
  const queryCounts = mostAskedQuery.reduce((acc, query) => {
    acc[query] = (acc[query] || 0) + 1;
    return acc;
  }, {});

  // Find the most frequent query, if any
  const mostFrequentQuery = mostAskedQuery.length > 0 
    ? Object.keys(queryCounts).reduce((a, b) => queryCounts[a] > queryCounts[b] ? a : b) 
    : null;


  // Find the count of the status
  let countFailed = 0;
  let countSucess = 0;
  const succesOrFail = cards.map((card) => card.response.queryResult.intentDetectionConfidence === 1 ? countSucess++ : countFailed++);
  
  const [filter,setFilter] = useState('All')
  const handleFilterChange = filter =>{
    setFilter(filter)
  }

  // Calculate the increase of the consults based on the month
  const [monthlyIncrement, setMonthlyIncrement] = useState({ currentMonth: 0, lastMonth: 0, increment: 0 });

  useEffect(() => {
    const fetchMonthlyIncrement = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/consults/monthly-increment');
        const data = response.data;
        setMonthlyIncrement({
          currentMonth: data.currentMonthConsults,
          lastMonth: data.lastMonthConsults,
          increment: data.increment
        });
      } catch (error) {
        console.error('Error fetching monthly increment:', error);
      }
    };

    fetchMonthlyIncrement();
  }, []);

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-12">
          <div className="row gy-2 gx-2">
            <Card name="Consults" icon="bi bi-chat-dots" amount={cards.length} percentage={monthlyIncrement.increment/100} active={true} query={null}/>
            <Card name="Failed" icon="bi bi-bug" amount={countFailed}  active={true} query={null} />
            <Card name="Success" icon="bi bi-check2" amount={countSucess} active={true} query={null} />
            <Card name="Top Consults" icon="bi bi-award" amount={null} percentage={0.96} active={true} query={mostFrequentQuery || 0} />
            <div className="col12">
              <Reports />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
