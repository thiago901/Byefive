import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import { IUser } from '@modules/User/infra/mongodb/schemas/Users';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}
@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
export default ListUsersService;
