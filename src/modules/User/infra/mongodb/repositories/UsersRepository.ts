import IUsersRepository from '@modules/User/infra/repositories/IUsersRepository';
import CreateUsersDTO from '@modules/User/dtos/CreateUsersDTO';
import SearchUsersDTO from '@modules/User/dtos/SearchUsersDTO';
import Users, { IUser } from '../schemas/Users';
import {} from 'mongoose';

export default class UsersRepository implements IUsersRepository {
  private ormRepository = Users;

  public async create({
    name,
    email,
    password,
  }: CreateUsersDTO): Promise<IUser> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({ email });
    if (!user) return undefined;
    return user;
  }

  public async findById(user_id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({ _id: user_id });
    if (!user) return undefined;
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    // eslint-disable-next-line no-underscore-dangle
    const userUpdated = await this.ormRepository.findOne({
      _id: user._id,
    });
    if (!userUpdated) {
      return user;
    }

    userUpdated.email = user.email;
    userUpdated.password = user.password;
    userUpdated.name = user.name;
    userUpdated.save();

    return userUpdated;
  }

  public async deleteById(user_id: string): Promise<void> {
    await this.ormRepository.deleteOne({
      _id: user_id,
    });
  }

  public async findAll(except_id?: string): Promise<IUser[]> {
    const user = await this.ormRepository
      .find({
        _id: { $ne: except_id },
      })
      .select(['name', 'email']);

    return user;
  }

  public async findAllWithParams({
    name,
    email,
  }: SearchUsersDTO): Promise<IUser[]> {
    const user = this.ormRepository
      .find({
        name: { $regex: new RegExp(name), $options: 'i' },
        email: { $regex: new RegExp(email), $options: 'i' },
      })
      .select(['name', 'email']);
    return user;
  }
}
