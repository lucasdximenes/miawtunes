import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  state = {
    loading: true,
    albumInfo: {},
    tracks: [],
    favoriteTracks: [],
  };

  componentDidMount() {
    this.loadMusics();
    this.loadFavoriteTracks();
  }

  loadMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const response = await getMusics(id);
    const albumInfo = response[0];
    const tracks = response.filter((music) => music.kind === 'song');
    this.setState({
      loading: false,
      albumInfo,
      tracks,
    });
  };

  loadFavoriteTracks = () => {
    this.setState({ loading: true }, async () => {
      const favoriteTracks = await getFavoriteSongs();
      const favoriteTracksId = favoriteTracks.map((track) => track.trackId);
      this.setState({ favoriteTracks: favoriteTracksId, loading: false });
    });
  };

  handleCheckbox = (e, musicObj) => {
    const { favoriteTracks } = this.state;
    const { target } = e;
    const { name } = target;
    if (target.checked) {
      favoriteTracks.push(parseInt(name, 10));
      this.setState({ loading: true }, async () => {
        const response = await addSong(musicObj);
        if (response === 'OK') {
          this.setState({
            loading: false,
          });
        }
      });
    } else {
      favoriteTracks.splice(favoriteTracks.indexOf(parseInt(name, 10)), 1);
      this.setState({ loading: true }, async () => {
        const response = await removeSong(musicObj);
        if (response === 'OK') {
          this.setState({
            loading: false,
          });
        }
      });
    }
    this.setState({
      favoriteTracks,
    });
  };

  render() {
    const { loading, albumInfo, tracks, favoriteTracks } = this.state;
    const { collectionName, artworkUrl100, artistName } = albumInfo;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="loaded-album-container">
            <div className="album-container">
              <img
                src={ artworkUrl100 }
                alt={ collectionName }
                className="album-image"
              />
              <p data-testid="album-name" className="album-name">
                {collectionName}
              </p>
              <p data-testid="artist-name" className="album-artist">
                {artistName}
              </p>
            </div>
            <div className="album-tracks-container">
              {tracks.map((music) => (
                <MusicCard
                  handleCheckbox={ this.handleCheckbox }
                  favoriteTracks={ favoriteTracks }
                  musicObj={ music }
                  key={ music.trackId }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
