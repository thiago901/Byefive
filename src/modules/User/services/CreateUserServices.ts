import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';
import { IUser } from '@modules/User/infra/mongodb/schemas/Users';

import CreateUsersDTO from '@modules/User/dtos/CreateUsersDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUsersDTO): Promise<IUser> {
    const checkUserEmailExists = await this.usersRepository.findByEmail(email);
    if (checkUserEmailExists) {
      throw new AppError('Email address alredy exist');
    }
    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return user;
  }
}
export default CreateUserService;
