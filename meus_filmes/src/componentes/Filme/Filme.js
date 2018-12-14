import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navegacao from "../elementos/Navegacao/Navegacao";
import FilmeInfo from "../elementos/FilmeInfo/FilmeInfo";
import QuatroColGrid from "../elementos/QuatroColGrid/QuatroColGrid";
import Ator from "../elementos/Ator/Ator";
import Spinner from "../elementos/Spinner/Spinner";
import "./Filme.css";

class Filme extends Component {
  state = {
    filme: null,
    atores: null,
    diretores: [],
    carregando: false
  };

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.filmeId}`)) {
      const state = JSON.parse(
        localStorage.getItem(`${this.props.match.params.filmeId}`)
      );
      this.setState({ ...state });
    } else {
      this.setState({ carregando: true });
      //primeiro carregar a seção de filmes
      const endpoint = `${API_URL}movie/${
        this.props.match.params.filmeId
      }?api_key=${API_KEY}&language=pt-BR`;
      this.trazItens(endpoint);
    }
  }

  trazItens = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        // console.log;
        if (result.status_code) {
          this.setState({ carregando: false });
        } else {
          this.setState({ filme: result }, () => {
            // e depois carrega os atores no setState da callback function
            const endpoint = `${API_URL}movie/${
              this.props.match.params.filmeId
            }/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                const diretores = result.crew.filter(
                  membro => membro.job === "Diretor"
                );

                this.setState(
                  {
                    atores: result.cast,
                    diretores,
                    carregando: false
                  },
                  () => {
                    localStorage.setItem(
                      `${this.props.match.params.filmeId}`,
                      JSON.stringify(this.state)
                    );
                  }
                );
              });
          });
        }
      })
      .catch(error => console.error("Erro:", error));
  };

  render() {
    return (
      <div className="filme">
        {this.state.filme ? (
          <div>
            <Navegacao filme={this.props.location.filmeNome} />
            <FilmeInfo
              filme={this.state.filme}
              diretores={this.state.diretores}
            />
          </div>
        ) : null}
        {this.state.atores ? (
          <div className="filme-grid">
            <QuatroColGrid header={"Atores"}>
              {this.state.atores.map((elemento, o) => {
                return <Ator key={o} ator={elemento} />;
              })}
            </QuatroColGrid>
          </div>
        ) : null}
        {!this.state.atores && !this.state.carregando ? (
          <h1>Não encontrado</h1>
        ) : null}
        {this.state.carregando ? <Spinner /> : null}
      </div>
    );
  }
}

export default Filme;
