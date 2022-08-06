import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import Loading from "./Loading";
import "../styles/Header.css";
import logo from "../styles/assets/logo.svg";
import avatar from "../styles/assets/avatar.svg";

class Header extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { name } = user;
    return (
      <header data-testid="header-component">
        {name ? (
          <div className="header-container">
            <div className="header-logo-avatar-container">
              <div className="header-logo">
                <img src={logo} alt="miawtunes" />
              </div>
              <div className="avatar-container">
                <span>{name}</span>
                <img src={avatar} alt="avatar" />
              </div>
            </div>
            <div className="header-nav">
              <nav>
                <Link to="/search" data-testid="link-to-search">
                  <button type="button" className="header-nav-btn">
                    Busca
                  </button>
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  <button type="button" className="header-nav-btn">
                    Favoritas
                  </button>
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  <button type="button" className="header-nav-btn">
                    Perfil
                  </button>
                </Link>
              </nav>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </header>
    );
  }
}

export default Header;
