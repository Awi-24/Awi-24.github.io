import React from 'react'
import './navbar.scss'
import {Link} from 'react-scroll'

function Navbar() {

  return (
    <div className='container-navbar sticky-top'>
        <div className='navbar navbar-expand justify-content-center'>

          <ul className='navbar-nav text-uppercase mr-auto'>
            <li className='nav-item'>
              <Link to='sobremim' className='nav-link hvr-grow' spy={true} smooth={true} offset={-200} duration={700}>Sobre Mim</Link>
            </li>
            <li className='nav-item'>
            <Link to='habilidades' className='nav-link hvr-grow' spy={true} smooth={true} offset={-100} duration={700}>Habilidades</Link>
              {/* <a className='nav-link hvr-grow' href='/'>Habilidades</a> */}
            </li>
            <li className='nav-item'>
            <Link to='servicos' className='nav-link hvr-grow' spy={true} smooth={true} offset={-100} duration={700}>Serviços</Link>
          {/*     <a className='nav-link hvr-grow' href='/'>Serviços</a> */}
            </li>
            <li>
            <Link to='projetos' className='nav-link hvr-grow' spy={true} smooth={true} offset={-100} duration={700}>Projetos</Link>
              {/* <a className='nav-link hvr-grow' href='/'>Projetos</a> */}
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar