import React from 'react'

const NavItem = ({ nav }) => {
  return (
    <li className="nav-item">
            <a href={nav.link} className="nav-link collapsed">
            <i className={nav.icon}></i>
            <span>{nav.name}</span>
        </a>
    </li>
  )
}

export default NavItem