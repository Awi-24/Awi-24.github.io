import React from 'react'
import './habilidades.scss'
import img02 from '../../assets/img02.png'

function Habilidades() {
  return (
    <div className='habilidades-container' id='habilidades'>
        <div className='habilidades row g-0 justify-content-evenly alin-content-center'>
            <div className='caixas col-sm-3 col-md-5 col-lg-5'>
               <img src={img02} alt={img02} className='img02'/>
            </div>

            <div className='content-text col-md-5 col-lg-5 col-sm-10 justify-content-sm-center justify-content-md-center'>
                <h4 className='text-uppercase text-md-end text-lg-end text-sm-center'>O que eu faço</h4>
                <h1 className='display-3 text-uppercase text-md-end text-lg-end text-sm-center'>Habilidades</h1>
                <p className='text-md-end text-lg-end text-sm-center'>
                Tenho habilidades de longa data envolvendo design, criação artística, e por estar cursando Engenharia de Computação,
                conheço boa parte dos processos que envolvem a criação de sites, aplicativos e outros tipos de projetos. Tenho uma base 
                em construção de banco de dados com SQL e programação em C++. Atualmente estou estudando desenvolvimento Web com React JS, biblioteca
                desenvolvida pelo Facebook para desenvolvimento de aplicativos e já sou capaz de fazer projetos pequenos, como sites portifólio.
                </p>

            </div>
        </div>

        
    </div>
  )
}

export default Habilidades