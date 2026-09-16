import { ZodError, type ZodType } from 'zod';

const formatZodError = (error: ZodError, prefixError = '') =>
  new Error(prefixError + error.issues[0]?.message);

const zodValidate = async (value: unknown, validatorSchema: ZodType) => {
  try {
    const validatedValue = await validatorSchema.parseAsync(value);
    console.log('data successfully validated:\n', validatedValue);
    return validatedValue;
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      throw formatZodError(error);
    }
    throw error;
  }
};

const zodValidateSync = (
  value: unknown,
  validatorSchema: ZodType,
  _validatorOptions = {},
  prefixError = '',
) => {
  try {
    return validatorSchema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      throw formatZodError(error, prefixError);
    }
    throw error;
  }
};

export {
  zodValidate,
  zodValidateSync,
};
