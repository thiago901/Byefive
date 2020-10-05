import { IUser } from '@modules/User/infra/mongodb/schemas/Users';
import CreateUsersDTO from '@modules/User/dtos/CreateUsersDTO';
import SearchUsersDTO from '@modules/User/dtos/SearchUsersDTO';

export default interface IUsersRepository {
  create(data: CreateUsersDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
  deleteById(id: string): Promise<void>;
  findAll(except_id?: string): Promise<IUser[]>;
  findAllWithParams({ name, email }: SearchUsersDTO): Promise<IUser[]>;
}
