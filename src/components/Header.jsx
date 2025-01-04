import React from 'react'
import './Header.css'
import Logo from './Logo'
import Nav from './Nav'
const Header = () => {
  return (
    <header id="header" className='header fixed-top d-flex align-items-center'>
        <Logo />
        <Nav/>
    </header>
  )
}

export default Header