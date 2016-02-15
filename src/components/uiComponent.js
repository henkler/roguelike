import React from 'react';

import Game from '../lib/game.js';
import MapComponent from './mapComponent';

class UIComponent extends React.Component {
  constructor(props) {
    super(props);

    var game = new Game();
    this.state = {
      game: game
    };
  }

  render() {
    return (
      <div>
        <MapComponent map={this.state.game.world.map} viewport={this.state.game.viewport} />
      </div>
    );
  }
}

export default UIComponent;
