import React from 'react';
import TileComponent from './tileComponent';

require('../styles/mapComponent.scss');

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

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

  render() {
    return (
      <div className="map">
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
