import React from "react";
import { IMAGE_BASE_URL } from "../../../config";
import "./Ator.css";

const Ator = props => {
  const POSTER_SIZE = "w154";
  return (
    <div className="ator">
      <img
        src={
          props.ator.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.ator.profile_path}`
            : "./imagens/sem_imagem.jpg"
        }
        alt="ícone ator"
      />
      <span className="ator-nome">{props.ator.name}</span>
      <span className="ator-personagem">{props.ator.character}</span>
    </div>
  );
};

export default Ator;
