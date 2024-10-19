import { Request, Response } from 'express';
import { UserAddBody, UserAddData } from '../types/user';
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
      const bodyData = req.body as UserAddBody;

      this.userDomain.checkData(req.body);

      const userData: UserAddData = {
        email: bodyData.email || '',
        username: bodyData.username || '',
        is_company: bodyData.is_company || false
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

  async update(req: Request, res: Response) {}

  async show(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}

  async login(req: Request, res: Response) {}
}
