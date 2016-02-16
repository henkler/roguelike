import React from 'react';

import Tile from '../lib/tile';

require('./tileComponent.scss');

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tile = this.props.tile;
    let displayValue = '';
    let displayClass = 'tile';

    if (tile.type === Tile.TYPE.wall) {
      displayValue = '#';
      displayClass += ' tile-wall';
    } else {
      // display the entity on the tile if it exists
      if (tile.entity) {
        displayValue = '@';
        displayClass += ' tile-player';
      } else {
        displayValue = '.';
        displayClass += ' tile-open';
      }
    }
    return (
      <span className={displayClass}>{displayValue}</span>
    );
  }
}

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
};

export default TileComponent;
