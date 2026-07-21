import httpStatus from 'http-status';
import { decryptJWSToken } from '#application/services/userServices/token.service.ts';


const authenticate = async (req: any, res: any, next: any) => {
	const token = req.cookies?.AccessToken || req?.headers?.authorization?.split(' ')?.[1];

	if (!token) {
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: 'ابتدا وارد شوید',
		});
	}

	let claims;

	try {
		claims = JSON.parse(await decryptJWSToken(token));
	} catch (e) {
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: 'ابتدا وارد شوید',
		});
	}

	if (!claims)
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: 'ابتدا وارد شوید',
		});

	if ((new Date) > new Date(claims.tokenExpireAt))
		return res.status(httpStatus.UNAUTHORIZED).send({
			message: 'ابتدا وارد شوید',
		});

	req.tokenData = claims;

	return next();
};

export default authenticate;
