import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchUsersServices from '@modules/User/services/SearchUsersServices';

interface IRequest {
  name?: string;
  email?: string;
}
export default class UsersSearchControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { name, email }: IRequest = req.query;

    const searchUsersServices = container.resolve(SearchUsersServices);
    const users = await searchUsersServices.execute({
      name: name || '',
      email: email || '',
    });
    return res.json(users);
  }
}
