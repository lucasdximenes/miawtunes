import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import searchAlbumsAPI from "../services/searchAlbumsAPI";
import "../styles/Search.css";
import firstSearch from "../styles/assets/first_search.svg";
import notFoundCat from "../styles/assets/not_found_cat.webp";

class Search extends Component {
  state = {
    inputArtistName: "",
    buttonDisabled: true,
    loading: false,
    searchedArtist: "",
    albums: [],
    isFirstSearch: true,
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
      }
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { inputArtistName } = this.state;
    this.setState({
      inputArtistName: "",
      buttonDisabled: true,
      loading: true,
    });
    const response = await searchAlbumsAPI(inputArtistName);
    this.setState({
      loading: false,
      searchedArtist: inputArtistName,
      albums: response,
      isFirstSearch: false,
    });
  };

  render() {
    // prettier-ignore
    const {
      inputArtistName, buttonDisabled, loading, searchedArtist, albums, isFirstSearch
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div className="search-form-container">
            {isFirstSearch && (
              <div>
                <div className="first-search-container">
                  <h1>Faça sua primeira pesquisa!</h1>
                </div>
                <form className="search-form">
                  <div className="input-icons">
                    <i className="material-icons" style={{ fontSize: "2rem" }}>
                      search
                    </i>
                    <input
                      data-testid="search-artist-input"
                      id="search-input"
                      type="text"
                      name="inputArtistName"
                      placeholder="Album ou Artista"
                      value={inputArtistName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    data-testid="search-artist-button"
                    className="search-button"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={buttonDisabled}
                  >
                    Pesquisar
                  </button>
                </form>
                <div className="first-search-container">
                  <img src={firstSearch} alt="first search" />
                </div>
              </div>
            )}
            {searchedArtist && (
              <div>
                <div className="searched-header-container">
                  <h2 className="searched-artist-title">{`Resultados da pesquisa por albuns de: ${searchedArtist}`}</h2>
                  <form className="search-form-searched">
                    <div className="input-icons-searched">
                      <i
                        className="material-icons"
                        style={{ fontSize: "2rem" }}
                      >
                        search
                      </i>
                      <input
                        data-testid="search-artist-input"
                        id="search-input"
                        type="text"
                        name="inputArtistName"
                        placeholder="Album ou Artista"
                        value={inputArtistName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      data-testid="search-artist-button"
                      className="after-search-button"
                      type="submit"
                      onClick={this.handleSubmit}
                      disabled={buttonDisabled}
                    >
                      Pesquisar
                    </button>
                  </form>
                </div>
                <div className="search-results">
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
                          <div key={collectionId} className="album-card">
                            <Link
                              data-testid={`link-to-album-${collectionId}`}
                              to={`/album/${collectionId}`}
                            >
                              <div className="album-img-holder">
                                <img
                                  src={artworkUrl100}
                                  alt={collectionName}
                                  className="album-image"
                                />
                              </div>
                            </Link>
                            <div className="album-text">
                              <h2>{collectionName}</h2>
                              <p>{artistName}</p>
                            </div>
                            <Link
                              data-testid={`link-to-album-${collectionId}`}
                              to={`/album/${collectionId}`}
                            >
                              <div className="album-play-icon">
                                <div className="album-circle">
                                  <div className="album-triangle"></div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="no-results-container">
                      <img src={notFoundCat} alt="Gato triste" />
                      <h2>Xiii, eu não encontrei nadinha!</h2>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
