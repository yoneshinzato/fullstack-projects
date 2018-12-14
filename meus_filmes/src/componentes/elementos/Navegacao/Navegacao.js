import React from "react";
import { Link } from "react-router-dom";
import "./Navegacao.css";

const Navegacao = props => {
  return (
    <div className="navegacao">
      <div className="navegacao-conteudo">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{props.filme}</p>
      </div>
    </div>
  );
};

export default Navegacao;
