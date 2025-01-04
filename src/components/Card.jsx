import React, {useState,useEffect} from 'react'
import './card.css'
import CardFilter from './CardFilter'
const Card = ({ name,icon,amount,percentage,active,query}) => {
  return (
    <div className='col-xxl-4 col-md-6'>
      <div className='card info-card sales-card'>
        <div className='card-body'>
          <h5 className='card-title' >
            {name} <span> | All</span>
          </h5>
          <div className='d-flex align-items-center'>
            <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
              <i className={icon}></i>
            </div>
            <div className='ps-3'>
              {
                name === 'Top Consults'
                  ? <h6 className='mb-0' style={{fontWeight: 'bold'}}>{query}</h6>
                :
                
                <>
                  <h6> 

                    {
                      amount.toLocaleString('en-US') 
                    }
                    
                  </h6>
                  <p className='mb-0'>
                    <span className={percentage > 0 ? 'text-success' : 'text-danger'}>
                      <i className={active ? 'fas fa-arrow-up' : 'fas fa-arrow-down'}></i>
                      {
                        percentage != null ? (
                          <>
                            {percentage}% <span style={{ fontSize: '0.8em', color: '#888' }}>this month</span>
                          </>
                        ) : null
                      }

                      
                    </span>
                  </p>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card




