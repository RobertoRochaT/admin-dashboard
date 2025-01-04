import React from 'react'
import './pageTitle.css'
const PageTitle = ({page}) => {
  return (
    <div className='pagetitle'>
        <h1>{page}</h1>
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <a href='#'></a>
                    <i className='bi bi-house-door'></i>
                </li>
                <li className='breadcrumb-item active'>{page}</li>
            </ol>
        </nav>
    </div>
  )
}

export default PageTitle