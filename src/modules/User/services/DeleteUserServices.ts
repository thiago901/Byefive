import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}
@injectable()
class DeleteUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }
    await this.usersRepository.deleteById(user._id);
  }
}
export default DeleteUserServices;
