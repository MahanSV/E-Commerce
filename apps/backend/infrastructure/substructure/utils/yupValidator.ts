const yupValidate = (value: any, validatorSchema: any, validatorOptions = {}) => {
  const defaultValidatorOptions = {
    stripUnknown: false,
    ...validatorOptions,
  };
  return new Promise((resolve, reject): void => {
    validatorSchema.validate(value, defaultValidatorOptions).then((validatedValue: any) => {
      console.log('data successfully validated:\n', validatedValue); // / returns car object
      resolve(validatedValue);
    }).catch((err: any) => {
      console.log(err);
      reject(err);
    });
  });
};

const yupValidateSync = (value: any, validatorSchema: any, validatorOptions = {}, prefixError = '') => {
  try {
    const defaultValidatorOptions = {
      stripUnknown: false,
      ...validatorOptions,
    };

    return validatorSchema.validateSync(value, defaultValidatorOptions);
  } catch (err: any) {
    throw new Error(prefixError + err.errors);
  }
};

export {
  yupValidate,
  yupValidateSync,
};
