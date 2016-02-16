import React from 'react';
import ReactDOM from 'react-dom';

import Game from '../lib/game.js';
import MapComponent from './mapComponent';

class UIComponent extends React.Component {
  constructor(props) {
    super(props);

    this.resizeHandler = this.handleResize.bind(this);

    const game = new Game();
    this.state = {
      game,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  handleResize() {
    const componentWidth = ReactDOM.findDOMNode(this).clientWidth;
    this.state.game.viewport.setWidth(componentWidth);
    this.setState({ game: this.state.game });
  }

  render() {
    return (
      <div>
        <MapComponent
          map={this.state.game.world.map}
          viewport={this.state.game.viewport}
        />
      </div>
    );
  }
}

export default UIComponent;
