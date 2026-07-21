import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import env from '#substructure/env.ts';
import { decryptJWSToken } from '#application/services/userServices/token.service.ts';
import UserService from '#application/services/userServices/user.service.ts';
import type { AddUserCommand } from '#application/types/user/command.ts';


class UserController {
  private userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }


  public async login(req: Request, res: Response): Promise<any> {
    const receivedToken = req.cookies?.TaxpayerToken;

    const { token, userInfo } = await this.userService.login(receivedToken);

    res.cookie('AccessToken', token, {
      maxAge: env.tokenExpirationTime * 1000,
      path: '/',
      domain: env.cookieDomain,
      secure: true,
      httpOnly: true,
      sameSite: 'lax',

    });

    res.status(httpStatus.OK).send({
      message: 'ورود با موفقیت انجام شد.',
      userInfo
    });
  };

   public async logout(req: Request, res: Response): Promise<any> {
    const { callbackUrl } = req.query;
    const accessToken = req.cookies.AccessToken;

    if (accessToken) {
      let claims = JSON.parse(await decryptJWSToken(accessToken));

      if (claims && (new Date) <= new Date(claims.tokenExpireAt)) {

        const command = {
          token: accessToken,
          ...claims,
        };

        await this.userService.userLogout(command);
      }
    }

    res.clearCookie('AccessToken', {
      path: '/',
      domain: env.cookieDomain,

    });

    res.clearCookie('Role', {
      path: '/',
      domain: env.cookieDomain,
    });

    return res.status(301).redirect(String(callbackUrl));
  };

  public async getUserById(req: Request, res: Response): Promise<any> {
    const userId= req.params.id;

    const user = await this.userService.getUserById(userId);

    res.status(httpStatus.OK).send({
      message: 'اطلاعات کاربر با موفقیت دریافت شد.',
      user
    });
  };

  public async getUsers(req: Request, res: Response): Promise<any> {
    const users = await this.userService.getUsers();

    res.status(httpStatus.OK).send({
      message: 'اطلاعات کاربران با موفقیت دریافت شد.',
      users
    });
  };

  public async getUserByNationalId(req: Request, res: Response): Promise<any> {
    const nationalId = req.params.nationalId;

    const user = await this.userService.getUserByNationalId(nationalId);

    res.status(httpStatus.OK).send({
      message: 'اطلاعات کاربر با موفقیت دریافت شد.',
      user
    });
  };

  public async addUser(req: Request, res: Response): Promise<any> {

    const command: AddUserCommand = req.body;

    const user = await this.userService.addUser(command);

    res.status(httpStatus.OK).send({
      message: 'اطلاعات کاربر با موفقیت ثبت شد.',
      user
    });
  };
}

const userController = new UserController();

export const login = userController.login.bind(userController);
export const logout = userController.logout.bind(userController);
export const getUserById = userController.getUserById.bind(userController);
export const getUsers = userController.getUsers.bind(userController);
export const getUserByNationalId = userController.getUserByNationalId.bind(userController);
export const addUser = userController.addUser.bind(userController);
