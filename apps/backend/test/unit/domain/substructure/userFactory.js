import { User } from '#models/productModels/index.ts';

const correctUsername = 'ali';
const correctPassword = 'Aa12345*';
const correctPhoneNumber = '09035962082';
const wrongPassword = '123';
const wrongPhoneNumber = '01236';
const emptyUsername = '';
const emptyPhoneNumber = '';

const userWithCorrectData = () => User.create(correctUsername, correctPassword, correctPhoneNumber);
const userWithWrongPassword = () => User.create(correctUsername, wrongPassword, correctPhoneNumber);
const userWithWrongPhoneNumber = () => User.create(correctUsername, correctPassword, wrongPhoneNumber);
const userWithEmptyUsername = () => User.create(emptyUsername, correctPassword, correctPhoneNumber);
const userWithEmptyPhoneNumber = () => User.create(correctUsername, correctPassword, emptyPhoneNumber);

export {
  userWithCorrectData,
  userWithWrongPassword,
  userWithWrongPhoneNumber,
  userWithEmptyUsername,
  userWithEmptyPhoneNumber,
};
