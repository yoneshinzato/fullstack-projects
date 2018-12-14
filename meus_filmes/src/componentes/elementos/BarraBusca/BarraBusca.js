import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './BarraBusca.css'

class BarraBusca extends Component {
  state = {
      value: '',
      
    }
    
  timeout =  null

  facaBusca = (evento) => {
    this.setState({ value: evento.target.value})
    clearTimeout(this.timeout)

    this.timeout = setTimeout( () =>{
      this.props.callback(this.state.value)
    }, 600)
  }

  render() {
    return (
      <div className="barra-de-busca">
          <div className="barra-de-busca-conteudo">
            <FontAwesome className="fa-busca" name="search" size='2x' />
            <input
              type="text"
              className="barra-de-busca-input"
              placeholder="Buscar"
              onChange={this.facaBusca}
              value={this.state.value}
            />
          </div>
      </div>
    )
  }

}
export default BarraBusca
