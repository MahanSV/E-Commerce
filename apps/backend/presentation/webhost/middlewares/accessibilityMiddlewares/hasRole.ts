import httpStatus from 'http-status';
import { decryptJWSToken } from '#application/services/TokenService.ts';
import ApiError from '#webhost/errors/apiError.ts';
import { Request, Response, NextFunction } from 'express';

const hasRole = (roles: any) => async (req: Request, res: Response, next: NextFunction) => {
	if (!Array.isArray(roles)) {
		throw new Error("roles must be array")
	}

	const token = req.cookies.AccessToken;
	const decrypt = await decryptJWSToken(token);
	const userData = JSON.parse(decrypt);

	if (!roles.some((role) => userData.types?.includes(role))) {
		next(new ApiError(httpStatus.FORBIDDEN, 'شما دسترسی لازم را ندارید', 'Error'));
	}

	next();

};

export default hasRole;
