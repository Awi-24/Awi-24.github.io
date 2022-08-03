import React from 'react'
import ServiBox from '../../components/ServiBox/ServiBox'
import './servicos.scss'
import Carousel from 'react-bootstrap/Carousel'

function Servicos() {
  return (
    <Carousel className="container-servicos" id='servicos'>
        <Carousel.Item>
            <ServiBox className='' 
            title2='sERVIÇOS Realizados'
            title='Identidade Visual'
            text='A identidade visual é a parte do site que mais importa para o seu site ou rede social.
            É o que define sua personalidade e a imagem que você quer passar para o público. Além da construção
            de sites, também realizo a construção de uma identidade para sua página do Instagram, Facebook,
            YouTube entre outras redes sociais.'
            image={require('../../assets/id.jpg')}
            />
      </Carousel.Item>
      <Carousel.Item>
            <ServiBox className='' 
            title2='Serviços Realizados'
            title='MODELO DE PORTFÓLIO'
            text='O primeiro passo para desenvolver o seu portfólio Web é criar um modelo, para que seja possível
            determnar o visual e as funcionalidades que você quer expôr para deixar seu site mais atrativo ao seu público.
            Realizo esse trabalho usando programas como Figma, Abode Photoshop e Adobe XD.'
            image={require('../../assets/proto.jpg')}
            />
      </Carousel.Item>
      <Carousel.Item>
            <ServiBox className='' 
            title2='Serviços Realizados'
            title='PORTFÓLIO WEB'
            text='Depois da prototipação é hora de construir o seu site e colocar no ar.
            Utilizando React JS ou apenas os recursos padrões de Web (HTML, CSS, JS) construo o seu site. O deploy e o hosting fica
            a critério do cliente, não estando inclusto no serviço.'
            image={require('../../assets/site.jpg')}
            />
      </Carousel.Item>
    </Carousel>
  )
}

export default Servicos