import React from 'react';

require('../styles/statsComponent.scss');

const StatsComponent = (props) => (
      <div className="stats-box">
        <ul>
          <li>Health: {props.player.health}</li>
          <li>Level: {props.player.level}</li>
          <li>Weapon: {props.player.weaponName}</li>
          <li>Max Attack: {props.player.maxDamage}</li>
          <li>XP: {props.player.xp}</li>
          <li>Next Level: {props.player.nextLevelXP}</li>
          <li>Position: {props.player.x}, {props.player.y}</li>
        </ul>
      </div>
);

StatsComponent.propTypes = {
  player: React.PropTypes.object.isRequired,
};

export default StatsComponent;
