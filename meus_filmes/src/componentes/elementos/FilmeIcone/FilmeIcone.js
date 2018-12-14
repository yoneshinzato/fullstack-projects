import "./FilmeIcone.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function FilmeIcone(props) {
  return (
    <div className="filme-icone">
      {props.clickable ? (
        <Link
          to={{
            pathname: `/${props.filmeId}`,
            filmeNome: `${props.filmeNome}`
          }}
        >
          <img src={props.imagem} alt="filme ícone" />
        </Link>
      ) : (
        <img src={props.imagem} alt="filme ícone" />
      )}
    </div>
  );
}

FilmeIcone.PropTypes = {
  imagem: PropTypes.string,
  filmeId: PropTypes.number,
  filmeNome: PropTypes.string
};
export default FilmeIcone;
