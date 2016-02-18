import React from 'react';

require('./messageBoxComponent.scss');

class MessageBoxComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    const textArea = this.refs.message_text_area;
    this._shouldScrollBottom = textArea.scrollTop + textArea.offsetHeight === textArea.scrollHeight;
  }

  componentDidUpdate() {
    if (this._shouldScrollBottom) {
      const textArea = this.refs.message_text_area;
      textArea.scrollTop = textArea.scrollHeight;
    }
  }

  render() {
    return (
      <div className="messagebox">
        <textarea ref="message_text_area" readOnly value={this.props.messages} />
      </div>
    );
  }
}

MessageBoxComponent.propTypes = {
  messages: React.PropTypes.string.isRequired,
};

export default MessageBoxComponent;
