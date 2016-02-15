import React from 'react';

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>{this.props.type}</span>
    );
  }
}

TileComponent.propTypes = {
  type: React.PropTypes.number.isRequired,
  entity: React.PropTypes.object
};

export default TileComponent;
