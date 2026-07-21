import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { yupValidateSync } from '#substructure/utils/yupValidator.ts';

const validate = (schema: any) => (req: any, res: any, next: any): any => {
  // const validSchema = pick(schema, ['params', 'query', 'body']);
  try {
    const object = {
      ...req.body,
      ...req.params,
      ...req.queryPolluted,
    };

    const value = yupValidateSync(object, schema);

    return next();
  } catch (error) {
    return next(new ApiError(httpStatus.BAD_REQUEST, error.message, 'Error'));
  }
};

export default validate;
