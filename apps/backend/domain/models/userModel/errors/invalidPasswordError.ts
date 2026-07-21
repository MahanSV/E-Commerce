import BaseError from '#substructure/error/baseError.ts';

class InvalidPasswordError extends BaseError {
  constructor(
    message = 'رمز عبور باید حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد. (حداقل شامل 8 کاراکتر)',
    innerMessage = 'Password validation failed on regex',
  ) {
    super(message, innerMessage);
  }
}

export default InvalidPasswordError;
