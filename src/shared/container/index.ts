import { container } from 'tsyringe';
import '@modules/User/providers';

import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/User/infra/mongodb/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
