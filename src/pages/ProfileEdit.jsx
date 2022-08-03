import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class ProfileEdit extends Component {
  state = {
    loading: true,
    isValid: false,
    name: '',
    email: '',
    image: '',
    description: '',
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
      },
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
      history.push('/profile');
    });
  };

  validateForm = () => {
    const emailRegex = /\b[\w\\.-]+@[\w\\.-]+\.\w{2,4}\b/gi;
    const { name, email, image, description } = this.state;
    const isValid = [
      name.length > 0,
      email.length > 0 && emailRegex.test(email),
      image.length > 0,
      description.length > 0,
    ].every(Boolean);
    this.setState({ isValid });
  };

  render() {
    const { loading, isValid, name, email, image, description } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Profile Edit</h1>
        {loading ? (
          <Loading />
        ) : (
          <form className="edit-profile-form-container">
            <div className="edit-profile-form-container__input-container">
              <label htmlFor="name">
                Name
                <input
                  data-testid="edit-input-name"
                  type="text"
                  id="name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="edit-profile-form-container__input-container">
              <label htmlFor="email">
                Email
                <input
                  data-testid="edit-input-email"
                  type="text"
                  id="email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="edit-profile-form-container__input-container">
              <label htmlFor="image">
                Image
                <input
                  data-testid="edit-input-image"
                  type="text"
                  id="image"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="edit-profile-form-container__input-container">
              <label htmlFor="description">
                Description
                <input
                  data-testid="edit-input-description"
                  type="text"
                  id="description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <button
              data-testid="edit-button-save"
              type="button"
              className="btn btn-primary"
              disabled={ !isValid }
              onClick={ this.handleSubmit }
            >
              Save
            </button>
          </form>
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
