import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { IUser } from '@modules/User/infra/mongodb/schemas/Users';
import authConfig from '@config/auth';
import IUserRepository from '@modules/User/infra/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const checkPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!checkPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // delete user.password;
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
