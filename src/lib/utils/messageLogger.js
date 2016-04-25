class MessageLogger {
  constructor(game) {
    this._game = game;
    this._messages = [];
    this._messageString = '';
  }

  storeMessage(message) {
    this._messages.push(message);
    this._updateMessageString();
  }

  get messages() {
    return this._messageString;
  }

  _updateMessageString() {
    let newMessageString = '';
    this._messages.forEach((message) => { newMessageString += `${message}\n`; });
    this._messageString = newMessageString;
  }
}

export default MessageLogger;
