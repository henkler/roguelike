import React from 'react';

import Tile from '../lib/tile';

require('./tileComponent.scss');

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const type = this.props.tile.type;
    let displayValue = '';

    if (type === Tile.TYPE.wall) {
      displayValue = '#';
    } else {
      displayValue = '.';
    }
    return (
      <span className="tile">{displayValue}</span>
    );
  }
}

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
};

export default TileComponent;
