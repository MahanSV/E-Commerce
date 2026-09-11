import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';

const isLocal = async (req: any, res: any, next: any) => {

	if (!(req.hostname==='localhost' || req.hostname==='127.0.0.1')) {
		next(new ApiError(httpStatus.FORBIDDEN, 'شما دسترسی لازم را ندارید', 'Error'));
	}
	next();

};

export default isLocal;
