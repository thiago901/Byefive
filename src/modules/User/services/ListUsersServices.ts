import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import { IUser } from '@modules/User/infra/mongodb/schemas/Users';

interface IRequest {
  except_id?: string;
}
@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ except_id }: IRequest): Promise<IUser[]> {
    const users = await this.usersRepository.findAll(except_id);

    return users;
  }
}
export default ListUsersService;
