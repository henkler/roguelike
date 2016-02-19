import React from 'react';
import StatsComponent from './statsComponent';
import MessageBoxComponent from './messageBoxComponent';

require('./footerComponent.scss');

const FooterComponent = (props) => (
    <div className="footer">
      <StatsComponent player={props.player} />
      <MessageBoxComponent messages={props.logger.messages} />
    </div>
);

FooterComponent.propTypes = {
  player: React.PropTypes.object.isRequired,
  logger: React.PropTypes.object.isRequired,
};

export default FooterComponent;
