import React from 'react';

import World from './world';

class Viewport extends React.Component {
  constructor(props) {
    super(props);

    var world = new World();
    this.state = {
      width: 600,
      height: 400,
      world: world,
      mapWidth: world.map.width,
      mapHeight: world.map.height,
      camera: {x: 0, y:0 }
    };
  }

  getViewportMap() {

  }

  render() {
    //var viewportMap = getViewportMap();

    var vp = [];

    for (var y = 0; y < this.state.mapHeight; y++) {
      for (var x = 0; x < this.state.mapWidth; x++) {
        var key = x + ':' + y;

        var tileValue = this.state.world.map._tiles[x][y].type;

        var tile = <span key={key}>{tileValue}</span>;
        vp.push(tile);
      }

      var key = y + '_row';
      vp.push(<br key={key} />);
    }

    return (
      <div>
        {vp}
      </div>
    );
  }
}

export default Viewport;
