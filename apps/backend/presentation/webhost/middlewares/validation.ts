import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { zodValidateSync } from '#substructure/utils/zodValidator.ts';

const validate = (schema: any) => (req: any, res: any, next: any): any => {
  // const validSchema = pick(schema, ['params', 'query', 'body']);
  try {
    const object = {
      ...req.body,
      ...req.params,
      ...req.queryPolluted,
    };

    const value = zodValidateSync(object, schema);

    return next();
  } catch (error) {
    return next(new ApiError(httpStatus.BAD_REQUEST, (error as any).message, 'Error'));
  }
};

export default validate;
