import React, { Component } from 'react';
import '../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
        <h1>Carregando...</h1>
      </div>
    );
  }
}
