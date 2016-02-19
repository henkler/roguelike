import React from 'react';

require('../styles/tileComponent.scss');

const TileComponent = (props) => (
    <div className={`tile ${props.tile.typeName}`}>
      <span>{props.tile.displayChar}</span>
    </div>
);

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
};

export default TileComponent;
