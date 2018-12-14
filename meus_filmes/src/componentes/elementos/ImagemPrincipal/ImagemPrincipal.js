      import './ImagemPrincipal.css'

      import React from 'react'
      
      function ImagemPrincipal(props) {
        return (
          <div className="imagem-principal"
            style={{
              background:
              `linear-gradient(to bottom, rgba(0,0,0,0)
              39%,rgba(0,0,0,0)
              41%,rgba(0,0,0,0.65)
              100%),
              url('${props.imagem}'), #1c1c1c`
            }}
            >
            <div className="imagem-principal-conteudo">
              <div className="imagem-principal-texto">
                <h1>{props.titulo}</h1>
                <p>{props.texto}</p>
              </div>
            </div>
          </div>
        )
      }
      
      export default ImagemPrincipal