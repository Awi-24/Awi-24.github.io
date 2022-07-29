import React from 'react'
import './sobremim.scss'
import img01 from '../../assets/img01.png'

function SobreMim() {
  return (
    <div className='container-sobremim' id='sobremim'>
        <div className='content-row row g-0 justify-content-evenly align-content-center'>
            <div className='content-text col-md-6'>
                <h4 className='text-uppercase'>Quem eu sou</h4>
                <h1 className='display-3 text-uppercase'>Sobre Mim</h1>
                <p className='text-start'>
                Olá! Meu nome é Adrian. Sou graduando do quarto semestre em Engenharia da Computação no <a href='https://www.senaicimatec.com.br/' target='_blank' rel='noreferrer' className='hvr-grow'>CIMATEC</a> Salvador. 
                Nasci na Suíça e vim para o Brasil quando ainda era um bebê. Meu primeiro contato com tecnologia foi um 
                Nintendo DS que recebi de familiares e desde então sou fascinado por tudo que envolve a área de TI. Inicialmente
                tinha a vontade de iniciar no desenvolvimento de jogos eletrônicos, por causa do meu hobbie gamer e minha familiaridade
                com aplicativos de design e modelagem. Contudo, foi com o desenvolvimento páginas da Web que eu me encontrei e desde
                então tenho usado meu tempo livre para aprender novas tecnologias como React JS.
                </p>

            </div>
            <div className='content-img col-md-4'>
                <img src={img01} alt='img01' />      
            </div>
        </div>
    </div>
  )
  
}

export default SobreMim