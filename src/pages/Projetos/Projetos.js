import React from 'react'
import './projetos.scss'
import noProj from '../../assets/noproj.png'
import clube from '../../assets/clube.png'

function Projetos() {
  return (
  <div className='projetos-container' id='projetos'>
    <div className='projetos'>
        <div className='content-text text-end'>
            <h4 className='text-uppercase'>Trabalhos já feitos</h4>
            <h1 className='display-3 text-uppercase'>Projetos</h1>
        </div>
        <div className='content-projets row g-0 justify-content-around align-content-center text-center'>
          <div className='box-clube col-4 '>
          <img src={clube} alt='Projeto do Clube de Programação' className='hvr-grow'/>
          <h1>Site do Clube De Programação</h1>
          </div>
          <div className='box col-4 hvr-grow'>
          <img src={noProj} alt='no proj'/>
          </div>
          <div className='box col-4 hvr-grow'>
          <img src={noProj} alt='no proj'/>
          </div>
        </div>
    </div> 
  </div>
  )
}

export default Projetos