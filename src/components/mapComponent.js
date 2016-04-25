import React from 'react';
import TileComponent from './tileComponent';
import { GameStatus } from '../lib/game.js';

require('../styles/mapComponent.scss');

class MapComponent extends React.Component {
  _renderMapTiles() {
    const tiles = [];
    const vp = this.props.viewport;
    const map = this.props.map;

    for (let y = vp.yMin; y <= vp.yMax; y++) {
      for (let x = vp.xMin; x <= vp.xMax; x++) {
        const key = `${x}:${y}`;
        const tile = map.getTile(x, y);

        tiles.push(<TileComponent key={key} tile={tile} />);
      }

      const key = `${y}_row`;
      tiles.push(<br key={key} />);
    }

    return tiles;
  }

  _renderModal() {
    if (this.props.gameStatus === GameStatus.win) {
      return <div className="map-modal"><h1>You Win!</h1></div>;
    } else if (this.props.gameStatus === GameStatus.lose) {
      return <div className="map-modal"><h1>Game Over!</h1></div>;
    }

    return null;
  }

  render() {
    return (
      <div className="map">
        {this._renderModal()}
        {this._renderMapTiles()}
      </div>
    );
  }
}

MapComponent.propTypes = {
  map: React.PropTypes.object.isRequired,
  viewport: React.PropTypes.object.isRequired,
  gameStatus: React.PropTypes.number.isRequired,
};

export default MapComponent;
