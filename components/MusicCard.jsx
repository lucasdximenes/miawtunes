import '../styles/MusicCard.css';
import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicObj, handleCheckbox, favoriteTracks } = this.props;
    const { trackName, trackId, previewUrl } = musicObj;
    return (
      <div className="music-card-container">
        <div className="music-card-index">
          <p>{trackName}</p>
        </div>
        <div className="music-card-player">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div className="music-card-favorite-checkbox">
          <label htmlFor="favorite-checkbox">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              name={ trackId }
              type="checkbox"
              id="favorite-checkbox"
              onChange={ (e) => {
                handleCheckbox(e, musicObj);
              } }
              checked={ favoriteTracks.includes(trackId) }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObj: propTypes.shape({
    trackName: propTypes.string.isRequired,
    trackId: propTypes.number.isRequired,
    previewUrl: propTypes.string.isRequired,
  }).isRequired,
  handleCheckbox: propTypes.func.isRequired,
  favoriteTracks: propTypes.arrayOf(propTypes.number).isRequired,
};

export default MusicCard;
