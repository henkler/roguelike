import React from 'react';

import Entity from '../lib/entities/entity';

require('./tileComponent.scss');

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tile = this.props.tile;
    let displayValue = null;
    let displayClass = 'tile';

    if (!tile.isExplored) {
      displayValue = <span>?</span>;
      displayClass += ' tile-unexplored';
    } else if (tile.isWall) {
      displayValue = <span>#</span>;
      displayClass += ' tile-wall';
    } else if (tile.hasEntity) {
      switch (tile.entity.type) {
        case Entity.TYPE.player:
          displayValue = <span>@</span>;
          displayClass += ' tile-player';
          break;
        case Entity.TYPE.enemy:
          displayValue = <span>{tile.entity.level}</span>;
          displayClass += ' tile-enemy';
          break;
        case Entity.TYPE.weapon:
          displayValue = <span>!</span>;
          displayClass += ' tile-weapon';
          break;
        case Entity.TYPE.potion:
          displayValue = <span>%</span>;
          displayClass += ' tile-potion';
          break;
        default:
          break;
      }
    } else {
      displayValue = <span>.</span>;
      displayClass += ' tile-open';
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
