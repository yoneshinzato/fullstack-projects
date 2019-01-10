import React from "react";
import ReactDOM from "react-dom";

//components
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
