import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
            <div className="header-nav">
              <nav>
                <Link to="/search" data-testid="link-to-search">
                  Search
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  Favorites
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="user-header">
              <span data-testid="header-user-name">{name}</span>
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
