import crypto from 'crypto';
import env from '#substructure/env.ts';

const encrypt = (value: string) => crypto.createHmac('sha256', env.privateEncryptingKey).update(value, 'utf-8').digest('base64');

const compare = (hashedLeftSide: string, rightSide: string): boolean => {
  const hashedNewValue = encrypt(rightSide)

  return hashedLeftSide === hashedNewValue;
};

export {
  encrypt,
  compare,
};
