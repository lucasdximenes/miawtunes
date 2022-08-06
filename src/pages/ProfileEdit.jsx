import React, { Component } from "react";
import propTypes from "prop-types";
import { getUser, updateUser } from "../services/userAPI";
import Loading from "../components/Loading";
import Header from "../components/Header";
import "../styles/ProfileEdit.css";
import avatar from "../styles/assets/avatar.svg";

class ProfileEdit extends Component {
  state = {
    loading: true,
    isValid: true,
    name: "",
    email: "",
    image: "",
    description: "",
  };

  componentDidMount = () => {
    this.loadUser();
  };

  loadUser = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState(
      {
        name,
        email,
        image,
        description,
        loading: false,
      },
      () => {
        this.validateForm();
      }
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      const { history } = this.props;
      history.push("/profile");
    });
  };

  validateForm = () => {
    const emailRegex = /\b[\w\\.-]+@[\w\\.-]+\.\w{2,4}\b/gi;
    const { email } = this.state;
    if (email === "") {
      this.setState({ isValid: true });
    } else if (email.length > 0 && !emailRegex.test(email)) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  };

  render() {
    const { loading, isValid, name, email, image, description } = this.state;
    const previewImage = avatar;
    const urlRegex =
      /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;

    return (
      <div>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="form-edit-profile-container">
            <form className="form-container">
              <div className="form-image-input">
                <div className="avatar-preview">
                  <img
                    src={urlRegex.test(image) ? image : previewImage}
                    alt="avatar"
                  />
                </div>
                <div className="image-input">
                  <label htmlFor="image">Alterar imagem</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    placeholder="Insira o link aqui"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="form-name-input">
                <div className="name-label">
                  <label htmlFor="name">Nome</label>
                  <span>como devemos te chamar?</span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Miaw Usuário"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-email-input">
                <div className="email-label">
                  <label htmlFor="email">Email</label>
                  <span>coloque seu email atual.</span>
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="miawusuario@miawmiaw.com"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-description-input">
                <div className="description-label">
                  <label htmlFor="description">Descrição</label>
                  <span>fale sobre você.</span>
                </div>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Escreva sua bio"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>

              <button
                type="button"
                className="save-profile-button"
                disabled={!isValid}
                onClick={this.handleSubmit}
              >
                Salvar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
