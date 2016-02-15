import React from 'react';

import TileComponent from './tileComponent';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this._renderMapTiles()}
      </div>
    );
  }

  _renderMapTiles() {
    var tiles = [];
    var vp = this.props.viewport;
    var map = this.props.map;

    for (var y = vp.yMin; y < vp.yMax; y++) {
      for (var x = vp.xMin; x < vp.xMax; x++) {
        var key = x + ':' + y;
        var type = map.getTile(x,y).type;

        tiles.push(<TileComponent key={key} type={type} />);
      }

      var key = y + '_row';
      tiles.push(<br key={key} />);
    }

    return tiles;
  }
}

MapComponent.propTypes = {
  map: React.PropTypes.object.isRequired,
  viewport: React.PropTypes.object.isRequired
};

export default MapComponent;
