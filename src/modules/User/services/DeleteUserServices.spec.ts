import FakeUserRepository from '@modules/User/infra/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import DeleteUserServices from './DeleteUserServices';

let fakeUserRepository: FakeUserRepository;
let deleteUserServices: DeleteUserServices;

describe('DeleteProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    deleteUserServices = new DeleteUserServices(fakeUserRepository);
  });
  it('should be able to delete the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoesss@gmail.com',
      password: '123456',
    });

    await deleteUserServices.execute({
      id: user._id,
    });
    const userVerify = await fakeUserRepository.findById(user._id);

    expect(userVerify).toBe(undefined);
  });
  it('should not be able to delete the profile nonexistent', async () => {
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
      deleteUserServices.execute({
        id: 'non-exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
