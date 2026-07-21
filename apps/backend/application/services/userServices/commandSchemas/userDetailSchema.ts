import { yup } from '@hoda/shared/esm/utils/validation/index.js';
import type { ObjectSchema } from 'yup';

interface UserDetailSchema {
	id: string;
}

const userDetailSchema: ObjectSchema<UserDetailSchema> = yup.object({
	id: yup.string().required('شناسه کاربر الزامی می باشد').uuid('شناسه کاربر معتبر نمی باشد.'),
});

export default userDetailSchema;