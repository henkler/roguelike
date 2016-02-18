import React from 'react';

require('./statsComponent.scss');

class StatsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stats-box">
        <ul>
          <li>Health: {this.props.player.health}</li>
          <li>Level: {this.props.player.level}</li>
          <li>Weapon: {this.props.player.weapon}</li>
          <li>Max Attack: {this.props.player.maxDamage}</li>
          <li>XP: {this.props.player.xp}</li>
          <li>Next Level: {this.props.player.nextLevelXP}</li>
        </ul>
      </div>
    );
  }
}

StatsComponent.propTypes = {
  player: React.PropTypes.object.isRequired,
};

export default StatsComponent;
