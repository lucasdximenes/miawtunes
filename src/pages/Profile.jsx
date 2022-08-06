import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import Loading from "../components/Loading";
import Header from "../components/Header";
import defaultAvatar from "../styles/assets/avatar.svg";
import "../styles/Profile.css";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    image: "",
    description: "",
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
    const { name, email, description, loading } = this.state;
    let { image } = this.state;
    if (image === "") image = defaultAvatar;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="profile-container">
            <div className="profile-infos-container">
              <div className="profile-image-container">
                <img data-testid="profile-image" src={image} alt="profile" />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <h2>Nome</h2>
                  <p>{name}</p>
                </div>
                <div className="profile-email">
                  <h2>Email</h2>
                  <p>{email}</p>
                </div>
                <div className="profile-description">
                  <h2>Descrição</h2>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
