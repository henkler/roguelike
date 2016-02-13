var React = require('react');

class Viewport extends React.Component {
  getInitialState() {
    return {
      map: [],
      mapWidth: 1200,
      mapHeight: 1200,
      viewportWidth: 600,
      viewportHeight: 400,
      camera: {x: 0, y:0 }
    }
  }

  getViewportMap() {

  }

  render() {
    var viewportMap = getViewportMap();

    var vp = [];

    for (var y = 0; y < viewportMap.height; y++) {
      for (var x = 0; x < viewportMap.width; x++) {
        var key = x + ':' + y;

        tile = <span key={key}>X</span>;
        vp.push(tile);
      }
    }

    return (
      <div>
        {vp}
      </div>
    );
  }
}
