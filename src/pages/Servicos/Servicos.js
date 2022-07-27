import React from 'react'
import ServiBox from '../../components/ServiBox/ServiBox'
import './servicos.scss'
import Carousel from 'react-bootstrap/Carousel'

function Servicos() {
  return (
    <Carousel className="container-servicos">
        <Carousel.Item>
            <ServiBox className='' 
            title2='sERVIÇOS Realizados'
            title='Identidade Visual'
            text='A identidade visual é a parte do site que mais importa para o seu site ou rede social.
            É o que define sua personalidade e a imagem que você quer passar para o público. Além da construção
            de sites, também realizo a construção de uma identidade para sua página do Instagram, Facebook,
            YouTube entre outras redes sociais. Desenvolvo sua logo, cartão de visita, templates de postagem, etc.'
            image={require('../../assets/id.jpg')}
            />
      </Carousel.Item>
      <Carousel.Item>
            <ServiBox className='' 
            title2='Serviços Realizados'
            title='PROTOTIPAÇÃO WEB'
            text='O primeiro passo para desenvolver o site que você precisa, é planejar como ele
            vai ser. Pensar nas funções, paletas de cores e informações que você deseja colocar
            no protótipo, ajuda a garantir que o site seja o mais bonito e funcional possível.'
            image={require('../../assets/proto.jpg')}
            />
      </Carousel.Item>
      <Carousel.Item>
            <ServiBox className='' 
            title2='Serviços Realizados'
            title='SITES PESSOAIS'
            text='Depois da prototipação é hora de construir o seu site e colocar no ar. A personalidade
            que você colocou junto comigo no modelo será completamente passada para seu site pessoal.
            Funções e outras características devem ser discutidas durante a prototipação, já que, uma
            alteração no design durante a fase de desenvolvimento pode inteferir o cronograma. Não realizo
            integração com banco de dados.'
            image={require('../../assets/site.jpg')}
            />
      </Carousel.Item>
    </Carousel>
  )
}

export default Servicos