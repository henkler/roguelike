import React from 'react';

import styles from './tileComponent.scss';

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className={styles.tile}>{this.props.tile.type}</span>
    );
  }
}

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired
};

export default TileComponent;
