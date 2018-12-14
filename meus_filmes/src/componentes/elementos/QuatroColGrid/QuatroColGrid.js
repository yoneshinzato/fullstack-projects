import React from "react";
import PropTypes from "prop-types";
import "./QuatroColGrid.css";

const QuatroColGrid = props => {
  const renderElementos = () => {
    const elementosGrid = props.children.map((elemento, i) => {
      return (
        <div key={i} className="elemento-grid">
          {elemento}
        </div>
      );
    });
    return elementosGrid;
  };

  return (
    <div className="grid">
      {props.header && !props.carregando ? <h1>{props.header}</h1> : null}
      <div className="conteudo-grid">{renderElementos()}</div>
    </div>
  );
};

QuatroColGrid.PropTypes = {
  header: PropTypes.string,
  carregando: PropTypes.bool.isRequired
};
export default QuatroColGrid;
