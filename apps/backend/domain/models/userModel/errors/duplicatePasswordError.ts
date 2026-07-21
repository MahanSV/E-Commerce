import BaseError from '#substructure/error/baseError.ts';

class DuplicatePasswordError extends BaseError {
  constructor(
    message = 'این کلمه عبور قبلا استفاده شده است، لطفا کلمه عبور دیگری انتخاب کنید!',
    innerMessage = 'Duplicate password is not allowed!',
  ) {
    super(message, innerMessage);
  }
}

export default DuplicatePasswordError;
