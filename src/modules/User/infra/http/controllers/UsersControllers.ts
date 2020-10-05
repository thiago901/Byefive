import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserServices from '@modules/User/services/CreateUserServices';
import UpdateUserServices from '@modules/User/services/UpdateProfileServices';
import DeleteUserServices from '@modules/User/services/DeleteUserServices';
import ListUsersService from '@modules/User/services/ListUsersServices';
import ShowUserService from '@modules/User/services/ShowUserServices';
import rmPassword from '@utils/removePasswordField';

export default class UsersControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserServices);
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    // const { id } = req.params;
    const { id } = req.user;
    const { name, email, password, old_password } = req.body;

    const updateUserServices = container.resolve(UpdateUserServices);
    const user = await updateUserServices.execute({
      id,
      name,
      email,
      password,
      old_password,
    });
    return res.json(rmPassword(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserServices = container.resolve(DeleteUserServices);
    await deleteUserServices.execute({
      id,
    });
    return res.status(204).json();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listUsersService = container.resolve(ListUsersService);
    const users = await listUsersService.execute({
      except_id: id,
    });
    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUserService = container.resolve(ShowUserService);
    const user = await showUserService.execute({
      user_id: id,
    });
    return res.json(rmPassword(user));
  }
}
