import BaseError from '#substructure/error/baseError.ts';

class InfrastructureInternalError extends BaseError {
  constructor(
    message = 'خطای سیستمی رخ داده است',
    innerMessage = 'An internal error has been occurred!',
  ) {
    super(message, innerMessage);

    this._type = InfrastructureInternalError.constructor.name;
  }
}

export default InfrastructureInternalError;
