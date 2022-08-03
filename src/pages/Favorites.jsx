import React, { Component } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
        (musicObj) => musicObj.trackId,
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
        1,
      );
      this.setState({ loading: true }, async () => {
        const response = await removeSong(musicObj);
        if (response === 'OK') {
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
        <h1>Favorites</h1>
        <div className="favorites-container">
          {loading ? (
            <Loading />
          ) : (
            <div className="favorites-list">
              <h2>Músicas favoritas:</h2>
              {favoriteTracks.map((musicObj) => (
                <MusicCard
                  key={ musicObj.trackId }
                  musicObj={ musicObj }
                  handleCheckbox={ this.handleCheckbox }
                  favoriteTracks={ favoriteTracksIds }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
