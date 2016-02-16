import React from 'react';
import Tile from '../lib/tile';

require('./tileComponent.scss');

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tile = this.props.tile;
    let displayValue = null;
    let displayClass = 'tile';

    if (!tile.explored) {
      displayValue = <span>?</span>;
      displayClass += ' tile-unexplored';
    } else if (tile.type === Tile.TYPE.wall) {
      displayValue = <span>#</span>;
      displayClass += ' tile-wall';
    } else {
      // display the entity on the tile if it exists
      if (tile.entity) {
        displayValue = <span>@</span>;
        displayClass += ' tile-player';
      } else {
        displayValue = <span>.</span>;
        displayClass += ' tile-open';
      }
    }
    return (
      <div className={displayClass}>{displayValue}</div>
    );
  }
}

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
};

export default TileComponent;
