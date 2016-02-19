import React from 'react';
import ReactDOM from 'react-dom';

import RogueLike from '../lib/roguelike.js';
import MapComponent from './mapComponent';
import FooterComponent from './footerComponent';

require('../styles/uiComponent.scss');

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

    this._roguelike = new RogueLike();

    this.logger = this._roguelike.logger;
    this.player = this._roguelike.player;
    this.scheduler = this._roguelike.scheduler;
    this.game = this._roguelike.game;
    this.map = this.game.map;
    this.viewport = this._roguelike.viewport;

    this.state = {
      map: this.map,
      logger: this.logger,
      player: this.player,
      viewport: this.viewport,
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
    this.updateState();
  }

  handleResize() {
    const mapWidth = ReactDOM.findDOMNode(this.refs.map).clientWidth;
    const mapHeight = ReactDOM.findDOMNode(this.refs.map).clientHeight;

    this.viewport.setSize(mapWidth, mapHeight);
    this.setState({ viewport: this.viewport });
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
    this.game.movePlayer(dx, dy);
    this.viewport.update();
    this.updateState();
  }

  updateState() {
    this.setState({
      map: this.map,
      logger: this.logger,
      player: this.player,
      viewport: this.viewport,
    });
  }

  render() {
    return (
      <div className="roguelike">
        <MapComponent ref="map"
          map={this.state.map}
          viewport={this.state.viewport}
        />
        <FooterComponent player={this.state.player} logger={this.state.logger} />
      </div>
    );
  }
}

export default UIComponent;
