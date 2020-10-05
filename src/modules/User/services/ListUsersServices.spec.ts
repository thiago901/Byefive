import FakeUserRepository from '@modules/User/infra/repositories/fakes/FakeUsersRepository';
import ListUsersServices from './ListUsersServices';

let fakeUserRepository: FakeUserRepository;
let listUsersServices: ListUsersServices;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listUsersServices = new ListUsersServices(fakeUserRepository);
  });

  it('should be able list user', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Thiago',
      email: 'tsrocha901@gmail.com',
      password: '1234567',
    });
    const user2 = await fakeUserRepository.create({
      name: 'Thiago',
      email: 'tsrocha902@gmail.com',
      password: '1234567',
    });

    const user = await listUsersServices.execute({});
    expect(user).toEqual([user1, user2]);
  });
});
