import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  state = {
    inputArtistName: '',
    buttonDisabled: true,
    loading: false,
    searchedArtist: '',
    albums: [],
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { inputArtistName } = this.state;
        const isValid = inputArtistName.length > 1;
        this.setState({
          buttonDisabled: !isValid,
        });
      },
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputArtistName } = this.state;
    this.setState({
      inputArtistName: '',
      buttonDisabled: true,
      loading: true,
    });
    const response = await searchAlbumsAPI(inputArtistName);
    this.setState({
      loading: false,
      searchedArtist: inputArtistName,
      albums: response,
    });
  };

  render() {
    // prettier-ignore
    const {
      inputArtistName, buttonDisabled, loading, searchedArtist, albums,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="search-form-container">
            <form className="search-form">
              <label htmlFor="search-input">
                Search:
                <input
                  data-testid="search-artist-input"
                  id="search-input"
                  type="text"
                  name="inputArtistName"
                  placeholder="Search"
                  value={ inputArtistName }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="submit"
                onClick={ this.handleSubmit }
                disabled={ buttonDisabled }
              >
                Pesquisar
              </button>
            </form>
            {searchedArtist && (
              <div className="search-results">
                <h2>{`Resultado de álbuns de: ${searchedArtist}`}</h2>
                {albums.length > 0 ? (
                  <div className="searched-albuns">
                    {albums.map((album) => {
                      const {
                        artistName,
                        collectionName,
                        collectionId,
                        artworkUrl100,
                      } = album;
                      return (
                        <div key={ collectionId } className="album-container">
                          <Link
                            data-testid={ `link-to-album-${collectionId}` }
                            to={ `/album/${collectionId}` }
                          >
                            <img
                              src={ artworkUrl100 }
                              alt={ collectionName }
                              className="album-image"
                            />
                          </Link>
                          <p className="album-name">{collectionName}</p>
                          <p className="album-artist">{artistName}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h3>Nenhum álbum foi encontrado</h3>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
