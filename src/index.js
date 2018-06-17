import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

var app = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  app
);
