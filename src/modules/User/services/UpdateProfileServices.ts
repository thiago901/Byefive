import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';
import { IUser } from '@modules/User/infra/mongodb/schemas/Users';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }

    const emailUsed = await this.usersRepository.findByEmail(email);

    if (emailUsed && emailUsed.id !== user.id) {
      throw new AppError('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Password invalidated');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
export default CreateUserService;
