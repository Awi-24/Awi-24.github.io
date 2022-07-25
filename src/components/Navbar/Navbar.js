import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <div className='container-navbar sticky-top'>
        <div className='navbar navbar-expand justify-content-center'>

          <ul className='navbar-nav text-uppercase mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='/'>Sobre Mim</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>Habilidades</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/'>Serviços</a>
            </li>
            <li>
              <a className='nav-link' href='/'>Projetos</a>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar