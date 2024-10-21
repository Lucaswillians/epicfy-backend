import { Request, Response } from 'express';
import {
  UserAddBody,
  UserAddData,
  UserUpdateBody,
  UserUpdateData
} from '../types/user';
import { UserDomain } from '../domain/UserDomain';
import { HttpUtils } from '../utils/HttpUtils';
import { ControllerUtils } from '../utils/ControllerUtils';

export class UserController {
  private userDomain: UserDomain;

  constructor() {
    this.userDomain = new UserDomain();
  }

  async add(req: Request, res: Response) {
    let content = {};
    let code = HttpUtils.SUCCESS;

    try {
      if (req.body) {
        req.body.is_company = !!req.body.is_company;
      }

      const bodyData = req.body as UserAddBody;

      this.userDomain.checkData(bodyData);

      const userData: UserAddData = {
        email: bodyData.email || '',
        username: bodyData.username || '',
        is_company: (bodyData.is_company || false),
        password: bodyData.password || ''
      };

      this.userDomain.validateEmail(userData.email);
      await this.userDomain.checkEmail(userData.email);
      const id = await this.userDomain.add(userData);

      content = ControllerUtils.success({ user: id });
    } catch (exception) {
      code = HttpUtils.ERROR;

      if (exception instanceof Error) {
        content = ControllerUtils.error(exception.message);
      } else {
        content = ControllerUtils.error(`${exception}`);
      }
    } finally {
      res.status(code).send(content)
    }
  }

  async show(req: Request, res: Response) {
    let content = {};
    let code = HttpUtils.SUCCESS;

    try {
      const userId = this.userDomain.checkId(req.params.id);
      const user = await this.userDomain.getById(userId);

      content = ControllerUtils.success({ user });
    } catch (exception) {
      code = HttpUtils.ERROR;

      if (exception instanceof Error) {
        content = ControllerUtils.error(exception.message);
      } else {
        content = ControllerUtils.error(`${exception}`);
      }
    } finally {
      res.status(code).send(content)
    }
  }

  async update(req: Request, res: Response) {
    let content = {};
    let code = HttpUtils.SUCCESS;

    try {
      const userId = this.userDomain.checkId(req.params.id);
      const bodyData = req.body as UserUpdateBody;

      this.userDomain.checkDataUpdate(bodyData);

      const userData: UserUpdateData = {
        username: bodyData.username || '',
        password: bodyData.password || ''
      };

      const id = await this.userDomain.update(userId,userData);

      content = ControllerUtils.success({ user: id });
    } catch (exception) {
      code = HttpUtils.ERROR;

      if (exception instanceof Error) {
        content = ControllerUtils.error(exception.message);
      } else {
        content = ControllerUtils.error(`${exception}`);
      }
    } finally {
      res.status(code).send(content)
    }
  }

  async delete(req: Request, res: Response) {}

  async login(req: Request, res: Response) {}
}
