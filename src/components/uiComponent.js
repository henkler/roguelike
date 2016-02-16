import React from 'react';
import ReactDOM from 'react-dom';

// import Game from '../lib/game.js';
import World from '../lib//world';
import Camera from '../lib//camera';
import Viewport from '../lib/viewport';
import Scheduler from '../lib/scheduler';

import MapComponent from './mapComponent';

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const DEFAULT_SCHEDULER_TICK = 1000;

class UIComponent extends React.Component {
  constructor(props) {
    super(props);

    this.resizeHandler = this.handleResize.bind(this);
    this.keypressHandler = this.handleKeypress.bind(this);
    this.schedulerTickHandler = this.schedulerTick.bind(this);
    this.schedulerInterval = null;

    const world = new World();
    const camera = new Camera(world.player);
    const viewport = new Viewport(world, camera);
    this.scheduler = new Scheduler(world);

    this.state = {
      world,
      viewport,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('keydown', this.keypressHandler);
    window.addEventListener('resize', this.resizeHandler);

    this.schedulerInterval = setInterval(this.schedulerTickHandler, DEFAULT_SCHEDULER_TICK);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keypressHandler);
    window.removeEventListener('resize', this.resizeHandler);
    clearInterval(this.schedulerInterval);
  }

  schedulerTick() {
    this.scheduler.tick();
    this.setState({ world: this.state.world });
  }

  handleResize() {
    const componentWidth = ReactDOM.findDOMNode(this).clientWidth;
    this.state.viewport.setWidth(componentWidth);
    this.setState({ viewport: this.state.viewport });
  }

  handleKeypress(event) {
    let dx = 0;
    let dy = 0;
    switch (event.keyCode) {
      case KEY_LEFT:
        dx = -1;
        this.handlePlayerMove(dx, dy);
        break;
      case KEY_UP:
        dy = -1;
        this.handlePlayerMove(dx, dy);
        break;
      case KEY_RIGHT:
        dx = 1;
        this.handlePlayerMove(dx, dy);
        break;
      case KEY_DOWN:
        dy = 1;
        this.handlePlayerMove(dx, dy);
        break;
      default:
        break;
    }
  }

  handlePlayerMove(dx, dy) {
    this.state.world.movePlayer(dx, dy);
    this.state.viewport.update();
    this.setState({ world: this.state.world, viewport: this.state.viewport });
  }

  render() {
    return (
      <div>
        <MapComponent
          map={this.state.world.map}
          viewport={this.state.viewport}
        />
      </div>
    );
  }
}

export default UIComponent;
