import React from 'react'
import './navbar.scss'

const Navbar = () => {

  //Adicionar ScrollToComponent
  

  return (
    <div className='container-navbar sticky-top'>
        <div className='navbar navbar-expand justify-content-center'>

          <ul className='navbar-nav text-uppercase mr-auto'>
            <li className='nav-item'>
              <a className='nav-link hvr-grow' href='/'>Sobre Mim</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link hvr-grow' href='/'>Habilidades</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link hvr-grow' href='/'>Serviços</a>
            </li>
            <li>
              <a className='nav-link hvr-grow' href='/'>Projetos</a>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar