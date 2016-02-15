import React from 'react';

const style = {
  backgroundColor: 'black',
  fontFamily: 'Courier New',
  fontSize: 30,
  color: 'white',
  textAlign: 'center',
  width: 35,
  height: 35,
  display: 'inline-block',
};

class TileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span style={style}>{this.props.tile.type}</span>
    );
  }
}

TileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
};

export default TileComponent;
