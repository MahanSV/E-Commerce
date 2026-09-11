import BaseError from '#substructure/error/baseError.ts';

class AbstractClassCreationError extends BaseError {
  constructor(
    message = 'از نوع کلاس انتزاعی نمیتوان شیئ ساخت',
    innerMessage = 'Abstract class can not be instantiate',
  ) {
    super(message, innerMessage);

    this._type = AbstractClassCreationError.constructor.name;
  }
}

export default AbstractClassCreationError;
