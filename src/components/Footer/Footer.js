import React from 'react'
import './footer.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

function Footer() {
  return (
    <div className='footer-container'>

      <h1 className='text-center display-6 pt-4'>Fale comigo</h1>
      <div className='footer pb-4'>
        <a href='https://github.com/Awi-24' target='_blank' rel='noreferrer' className='git'>
          <GitHubIcon />
        </a>
        <a href='https://www.linkedin.com/in/adrian-widmer-0587a9230/' target='_blank' rel='noreferrer' className='git'>
          <LinkedInIcon />
        </a>
        <a href='https://www.instagram.com/adrian__widmer/' target='_blank' rel='noreferrer' className='linkedin'>
          <InstagramIcon />
        </a>
        <a href='https://www.t.me/AdrianWidmer' target='_blank' rel='noreferrer' className='telegram'>
          <TelegramIcon />
        </a>
      </div>
    </div>
  )
}

export default Footer