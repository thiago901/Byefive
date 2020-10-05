import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import { IUser } from '@modules/User/infra/mongodb/schemas/Users';

interface IRequest {
  name: string;
  email: string;
}
@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<IUser[]> {
    const users = await this.usersRepository.findAllWithParams({
      name,
      email,
    });

    return users;
  }
}
export default ListUsersService;
