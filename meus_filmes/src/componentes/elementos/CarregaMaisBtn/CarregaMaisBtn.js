import "./CarregaMaisBtn.css";

import React from "react";

function CarregaMaisBtn(props) {
  return (
    <div className="carrega-mais-btn" onClick={props.onClick}>
      <p>{props.texto}</p>
    </div>
  );
}

export default CarregaMaisBtn;
