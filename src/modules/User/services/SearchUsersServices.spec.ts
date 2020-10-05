import FakeUserRepository from '@modules/User/infra/repositories/fakes/FakeUsersRepository';
import SearchUsersServices from './SearchUsersServices';

let fakeUserRepository: FakeUserRepository;
let searchUsersServices: SearchUsersServices;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    searchUsersServices = new SearchUsersServices(fakeUserRepository);
  });

  it('should be able list user', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1234567',
    });
    await fakeUserRepository.create({
      name: 'Thiago',
      email: 'thiago@gmail.com',
      password: '1234567',
    });

    const user = await searchUsersServices.execute({
      name: 'doe',
      email: '',
    });
    expect(user).toEqual([user1]);
  });
});
