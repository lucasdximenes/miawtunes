import React, { Component } from "react";
import logo from "../styles/assets/logo.svg";
import notFoundCat from "../styles/assets/not_found_cat.webp";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

class NotFound extends Component {
  state = {
    isLoading: false,
  };

  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({ isLoading: true }, () => {
        setTimeout(() => {
          const { history } = this.props;
          history.push("/");
        }, 2000);
      });
    }, 5000);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="not-found-page">
            <div className="logo-container">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="not-found-container">
              <img src={notFoundCat} alt="Gato triste" />
              <h1>A página que você está procurando não foi encontrada.</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NotFound;
