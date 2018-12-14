import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../../config";
import ImagemPrincipal from "../elementos/ImagemPrincipal/ImagemPrincipal";
import BarraBusca from "../elementos/BarraBusca/BarraBusca";
import QuatroColGrid from "../elementos/QuatroColGrid/QuatroColGrid";
import FilmeIcone from "../elementos/FilmeIcone/FilmeIcone";
import CarregaMaisBtn from "../elementos/CarregaMaisBtn/CarregaMaisBtn";
import Spinner from "../elementos/Spinner/Spinner";

class Home extends Component {
  state = {
    filmes: [],
    imagemPrincipal: null,
    carregando: false,
    paginaAtual: 0,
    totalDePaginas: 0,
    termosDeBusca: ""
  };

  componentDidMount() {
    if (localStorage.getItem("EstadoHome")) {
      const state = JSON.parse(localStorage.getItem("EstadoHome"));
      this.setState({ ...state });
    } else {
      this.setState({ carregando: true });
      //especificar a url de onde pegaremos as informações
      const pegaUrl = `
    ${API_URL}movie/popular?api_key=${API_KEY}&language=pt-BR&page=1
    `;
      this.pegaItens(pegaUrl);
    }
  }

  //será usado na barra de busca
  //se o usuário apagar/deletar o conteúdo do campo de busca, deverão aparecer os filmes mais populares
  //se ele digitar de fato uma busca, aparecerá aquilo que ele buscou

  buscaItens = termosDeBusca => {
    console.log(termosDeBusca);
    let campo = "";
    this.setState({
      filmes: [],
      carregando: true,
      termosDeBusca
    });

    if (termosDeBusca === "") {
      campo = `${API_URL}movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
    } else {
      campo = `${API_URL}search/movie?api_key=${API_KEY}&language=pt-BR&query=${termosDeBusca}`;
    }
    this.pegaItens(campo);
  };

  //precisa de dois urls diferentes da api
  //ao fazer uma pesquisa, vai carregar mais itens pesquisados
  //se não estiver fazendo a pesquisa, precisa carregar os filmes mais populares

  carregaMaisItens = () => {
    let endpoint = "";
    this.setState({ carregando: true });
    if (this.state.termosDeBusca === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pt-BR&page=${this
        .state.paginaAtual + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=pt-BR&query=${
        this.state.termosDeBusca
      }&page=${this.state.paginaAtual + 1}`;
    }
    this.pegaItens(endpoint);
  };

  //alimentar as informações que vêm da API
  pegaItens = campo => {
    fetch(campo)
      .then(resultado => resultado.json())
      .then(resultado => {
        this.setState(
          {
            filmes: [...this.state.filmes, ...resultado.results],
            imagemPrincipal: this.state.imagemPrincipal || resultado.results[0],
            carregando: false,
            paginaAtual: resultado.page,
            totalDePaginas: resultado.total_pages
          },
          () => {
            if (this.state.termosDeBusca === "") {
              localStorage.setItem("EstadoHome", JSON.stringify(this.state));
            }
          }
        );
      })
      .catch(erro => console.error("Erro:", erro));
  };

  render() {
    return (
      <div className="home">
        {this.state.imagemPrincipal ? (
          <div>
            <ImagemPrincipal
              imagem={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                this.state.imagemPrincipal.backdrop_path
              }`}
              titulo={this.state.imagemPrincipal.original_title}
              texto={this.state.imagemPrincipal.overview}
            />
            <BarraBusca callback={this.buscaItens} />
          </div>
        ) : null}

        <div className="home-grid">
          <QuatroColGrid
            header={
              this.state.termosDeBusca
                ? "Resultado das buscas"
                : "Mais populares"
            }
            carregando={this.state.carregando}
          >
            {this.state.filmes.map((elemento, i) => {
              return (
                <FilmeIcone
                  key={i}
                  clickable={true}
                  imagem={
                    elemento.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${elemento.poster_path}`
                      : "./imagens/sem_imagem.jpg"
                  }
                  filmeId={elemento.id}
                  filmeNome={elemento.original_title}
                />
              );
            })}
          </QuatroColGrid>
          {this.state.carregando ? <Spinner /> : null}
          {this.state.paginaAtual <= this.state.totalDePaginas &&
          !this.state.carregando ? (
            <CarregaMaisBtn
              texto="Carregar mais"
              onClick={this.carregaMaisItens}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
