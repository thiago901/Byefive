import FakeUserRepository from '@modules/User/infra/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserServices from './ShowUserServices';

let fakeUserRepository: FakeUserRepository;
let showUserServices: ShowUserServices;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showUserServices = new ShowUserServices(fakeUserRepository);
  });
  it('should be able list user', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Thiago',
      email: 'tsrocha901@gmail.com',
      password: '1234567',
    });

    const user = await showUserServices.execute({ user_id: user1._id });
    expect(user.email).toBe('tsrocha901@gmail.com');
  });
  it('should not be able to list a user nonexistent', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoesss@gmail.com',
      password: '123456',
    });

    await expect(
      showUserServices.execute({
        user_id: 'non-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
