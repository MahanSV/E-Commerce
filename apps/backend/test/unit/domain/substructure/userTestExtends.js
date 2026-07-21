import { compare } from '#substructure/utils/encryption.ts';

expect.extend({
  toCheckUserPass(received) {
    const user = received();

    if (!compare(user.password.value, 'Aa12345*')) {
      return {
        pass: false,
        message: () => 'The password did not set correctly! Excepted password is "Aa12345*"',
      };
    }

    return {
      pass: true,
      message: () => 'Password is set correctly.',
    };
  },
});
