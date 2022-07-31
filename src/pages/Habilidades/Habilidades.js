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
                Tenho habilidades de longa data envolvendo design e criação artística. Junto a isso, possuo o conhecimento
                adquirido aos longo do curso de Engenharia da Computação, como o estruturas de dados, construção de banco de
                dados com SQL, envolvendo todas as etapas de planejamento e código, linguagem C/C++ e Java. Estou estudando
                e já desenvolvi Websites com as tecnologias do React JS e HTML5/CSS3 puro ou com auxílio do BOOTSTRAP 5.
                Posso construir sites pessoais, de lojas pequenas e sites profissionais (como sites de porfifólio) do zero,
                começando pela prototipação e até desenvolvimento de logotipos. Aprendo relativamente rápido e estou sempre
                buscando me aprimorar.
                </p>

            </div>
        </div>

        
    </div>
  )
}

export default Habilidades