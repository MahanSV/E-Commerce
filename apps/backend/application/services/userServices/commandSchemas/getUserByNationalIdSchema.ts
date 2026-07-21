import { yup } from '@hoda/shared/esm/utils/validation/index.js';
import type { ObjectSchema } from 'yup';

interface GetUserByNationalIdSchema {
  nationalId: string;
}

const getUserByNationalIdSchema: ObjectSchema<GetUserByNationalIdSchema> = yup.object({
  nationalId: yup.string().required('کد ملی الزامی می باشد.').nationalId(),
});

export default getUserByNationalIdSchema;