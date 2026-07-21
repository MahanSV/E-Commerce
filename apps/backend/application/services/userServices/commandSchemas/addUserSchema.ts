import { yup } from '@hoda/shared/esm/utils/validation/index.js';
import type { ObjectSchema } from 'yup';

interface AddUserSchema {
  firstName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  gender: string;
}

const addUserSchema: ObjectSchema<AddUserSchema> = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  nationalId: yup.string().required('کد ملی الزامی می باشد.').nationalId(),
  mobile: yup.string().required().mobile(),
  gender: yup.string().required().oneOf(['MALE','FEMALE'],'جنسیت باید یکی از مقادیر MALE و FEMALE باشد'),
})

export default addUserSchema;
