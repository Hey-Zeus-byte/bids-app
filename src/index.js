import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
  <HashRouter basename="/">
    <App />
  </HashRouter>,
  document.getElementById("root")
);
