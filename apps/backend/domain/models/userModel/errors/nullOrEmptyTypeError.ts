import BaseError from '#substructure/error/baseError.ts';

class NullOrEmptyTypeError extends BaseError {
  constructor(message = 'نوع کاربر نمیتواند خالی باشد', innerMessage = 'Type can not be empty') {
    super(message, innerMessage);
  }
}

export default NullOrEmptyTypeError;