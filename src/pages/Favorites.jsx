import React, { Component } from "react";
import { getFavoriteSongs, removeSong } from "../services/favoriteSongsAPI";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MusicCard from "../components/MusicCard";
import "../styles/Favorites.css";
import favoriteCat from "../styles/assets/favorite_cat.svg";
import favoriteHeart from "../styles/assets/favorite_heart.svg";

class Favorites extends Component {
  state = {
    favoriteTracks: [],
    favoriteTracksIds: [],
    loading: true,
  };

  componentDidMount = () => {
    this.loadFavoriteSongs();
  };

  loadFavoriteSongs = async () => {
    this.setState({ loading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      const favoriteTracksIds = favoriteSongs.map(
        (musicObj) => musicObj.trackId
      );
      this.setState({
        favoriteTracks: favoriteSongs,
        favoriteTracksIds,
        loading: false,
      });
    });
  };

  handleCheckbox = (e, musicObj) => {
    const { checked, name } = e.target;
    const { favoriteTracksIds } = this.state;
    if (!checked) {
      favoriteTracksIds.splice(
        favoriteTracksIds.indexOf(parseInt(name, 10)),
        1
      );
      this.setState({ loading: true }, async () => {
        const response = await removeSong(musicObj);
        if (response === "OK") {
          this.loadFavoriteSongs();
        }
      });
    }
  };

  render() {
    const { loading, favoriteTracks, favoriteTracksIds } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-container">
          <div className="favorites-header">
            <img src={favoriteHeart} alt="coração" />
            <h1>Favorites</h1>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="favorites-list">
              <div className="favorite-cat">
                <img src={favoriteCat} alt="gato" />
              </div>
              <div className="favorite-tracks">
                {favoriteTracks.map((musicObj) => (
                  <MusicCard
                    key={musicObj.trackId}
                    musicObj={musicObj}
                    handleCheckbox={this.handleCheckbox}
                    favoriteTracks={favoriteTracksIds}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
