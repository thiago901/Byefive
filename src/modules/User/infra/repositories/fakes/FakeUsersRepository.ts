import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import CreateUsersDTO from '@modules/User/dtos/CreateUsersDTO';
import SearchUsersDTO from '@modules/User/dtos/SearchUsersDTO';
import Users, { IUser } from '../../mongodb/schemas/Users';

export default class FakeUsersRepository implements IUsersRepository {
  private ormRepository: IUser[] = [];

  public async create({
    name,
    email,
    password,
  }: CreateUsersDTO): Promise<IUser> {
    const user = new Users();

    Object.assign(user, {
      _id: Math.random().toString(16),
      name,
      email,
      password,
    });
    this.ormRepository.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.ormRepository.find(u => u.email === email);
    return user;
  }

  public async findById(user_id: string): Promise<IUser | undefined> {
    const user = this.ormRepository.find(u => u._id === user_id);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const userIndex = this.ormRepository.findIndex(u => u._id === user._id);
    this.ormRepository[userIndex] = user;
    return user;
  }

  public async deleteById(user_id: string): Promise<void> {
    const userIndex = this.ormRepository.findIndex(u => u._id === user_id);
    this.ormRepository.splice(userIndex, 1);
  }

  public async findAll(except_id?: string): Promise<IUser[]> {
    const user = this.ormRepository.filter(u => u._id !== except_id);
    return user;
  }

  public async findAllWithParams({
    name,
    email,
  }: SearchUsersDTO): Promise<IUser[]> {
    const user = this.ormRepository.filter(u => {
      const exprName = new RegExp(name, 'i');
      const exprEmail = new RegExp(email, 'i');
      return exprName.test(u.name) && exprEmail.test(u.email);
    });
    return user;
  }
}
