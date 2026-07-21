import BaseError from '#substructure/error/baseError.ts';

class NullOrEmptyNationalIdError extends BaseError {
  constructor(
    message = 'کد ملی نمیتواند خالی باشد',
    innerMessage = 'NationalId can not be empty',
  ) {
    super(message, innerMessage);
  }
}

export default NullOrEmptyNationalIdError;
