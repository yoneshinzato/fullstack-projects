import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../../config";
import FontAwesome from "react-fontawesome";
import FilmeIcone from "../FilmeIcone/FilmeIcone";
import "./FilmeInfo.css";

const FilmeInfo = props => {
  return (
    <div
      className="filme-info"
      style={{
        background: props.filme.backdrop_path
          ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${
              props.filme.backdrop_path
            }')`
          : "#41295a"
      }}
    >
      <div className="filme-info-conteudo">
        <div className="filme-info-icone">
          <FilmeIcone
            imagem={
              props.filme.backdrop_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.filme.poster_path}`
                : "./imagens/sem_imagem.jpg"
            }
            clickable={false}
          />
        </div>
        <div className="filme-info-texto">
          <h1>{props.filme.title}</h1>
          <h3>ENREDO</h3>
          <p>{props.filme.overview}</p>
          <h3>AVALIAÇÃO DO IMDB</h3>
          <div className="avaliacao">
            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={props.filme.vote_average * 10}
            />

            <p className="pontuacao">{props.filme.vote_average}</p>
          </div>
        </div>
        <FontAwesome className="fa-film" name="filme" size="3x" />
      </div>
    </div>
  );
};

export default FilmeInfo;
