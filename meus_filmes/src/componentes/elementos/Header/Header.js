import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-conteudo">
        <Link to="/">
          <img className="logo" src="./imagens/logo.png" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
