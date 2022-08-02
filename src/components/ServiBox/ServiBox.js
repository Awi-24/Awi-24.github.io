import React from 'react'
import './servibox.scss'

function ServiBox(props) {
  return (
    <div className='container-servibox w-100'>
    <div className='content-row row g-0 justify-content-evenly align-content-center'>
        <div className='content-text col-6 '>
            <h4 className='text-uppercase'>{props.title2}</h4>
            <h1 className='display-4 text-uppercase'>{props.title}</h1>
            <p className='text-start'>
            {props.text}
            </p>

        </div>
        <div className='content-img col-sm-4'>
            <img src={props.image} alt='img' className='hvr-grow' />      
        </div>
    </div>
</div>
  )
}

export default ServiBox