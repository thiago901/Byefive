import FakeUserRepository from '@modules/User/infra/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/User/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserServices';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeHashProvider,
      fakeUserRepository,
    );
  });

  it('should be able create user', async () => {
    const user = await createUserService.execute({
      name: 'Thiago',
      email: 'tsrocha901@gmail.com',
      password: 'qwertyuiop',
    });
    expect(user).toHaveProperty('_id');
  });
  it('should not be able create user in same email', async () => {
    await createUserService.execute({
      name: 'Thiago',
      email: 'tsrocha901@gmail.com',
      password: 'qwertyuiop',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'tsrocha901@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
