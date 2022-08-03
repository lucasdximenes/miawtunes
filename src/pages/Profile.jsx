import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
  };

  componentDidMount = () => {
    this.loadProfile();
  };

  loadProfile = async () => {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      loading: false,
    });
  };

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="profile-container">
            <div className="profile-image-container">
              <img data-testid="profile-image" src={ image } alt="profile" />
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>
            </div>
            <div className="profile-info">
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
