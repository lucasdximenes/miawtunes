import React, { Component } from "react";
import "../styles/Loading.css";
import loadingCat from "../styles/assets/loading.svg";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
        <div className="loading-cat-container">
          <div className="load-element">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <img src={loadingCat} alt="loading" />
        </div>
      </div>
    );
  }
}
