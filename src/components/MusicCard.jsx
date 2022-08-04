import "../styles/MusicCard.css";
import React, { Component } from "react";
import propTypes from "prop-types";

class MusicCard extends Component {
  render() {
    const { musicObj, handleCheckbox, favoriteTracks } = this.props;
    const { trackName, trackId, previewUrl } = musicObj;
    return (
      <div className="music-card-container">
        <div className="music-card-name">
          <p>{trackName}</p>
        </div>
        <div className="music-card-player">
          <audio data-testid="audio-component" src={previewUrl} controls>
            <track kind="captions" />O seu navegador não suporta o elemento{" "}
            <code>audio</code>.
          </audio>
        </div>
        <div className="music-card-favorite-checkbox">
          <input
            data-testid={`checkbox-music-${trackId}`}
            name={trackId}
            type="checkbox"
            id={`favorite-checkbox-${trackId}`}
            onChange={(e) => {
              handleCheckbox(e, musicObj);
            }}
            checked={favoriteTracks.includes(trackId)}
          />
          <label
            className="label"
            htmlFor={`favorite-checkbox-${trackId}`}
          ></label>
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
