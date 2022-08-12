import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './main.scss'

function Main() {
  return (
    
    <div className='container-main'>
      <div className='content-text row g-0 justify-content-lg-start align-content-center'>
        <div className='text col-sm-10 col-md-6 col-lg-6 text-uppercase'>
        <h1 className='display-3 slide-in-bottom text-nowrap'>&lt;Adrian <span>Widmer&gt;</span></h1>
        <h4 className='text-lowercase slide-in-bottom text-nowrap'><span>Designer e</span> Web Dev</h4>
        <h1 className='display-3 slide-in-bottom text-nowrap'>&lt;/Adrian <span>Widmer&gt;</span></h1>

        </div> 
      </div>
      <div className='symbol row g-0 justify-content-center align-content-center'>
      <ArrowDropDownIcon className='arrow col-1 hvr-hang'/>
      </div>
      
    </div>
  )
}

export default Main