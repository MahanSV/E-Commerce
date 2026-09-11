class BaseError extends Error {
  _occurredDateTime;

  _innerMessage;

  _type;

  constructor(
    message = 'An error has been occurred!',
    innerMessage = 'An error has been occurred!',
  ) {
    super(message);

    this._type = BaseError.constructor.name;
    this._innerMessage = innerMessage;
    this._occurredDateTime = new Date();
  }

  get occurredDateTime() {
    return this._occurredDateTime;
  }

  get type() {
    return this._type;
  }
}

export default BaseError;
