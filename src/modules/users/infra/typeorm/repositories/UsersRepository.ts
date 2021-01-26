import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormUser: Repository<User>;

  constructor() {
    this.ormUser = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormUser.findOne({
      where: { email },
    });

    return user;
  }

  public async findByID(id: string): Promise<User | undefined> {
    const user = await this.ormUser.findOne(id);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormUser.create(userData);

    await this.ormUser.save(user);

    return user;
  }

  public async save(userData: User): Promise<User> {
    const user = await this.ormUser.save(userData);

    return user;
  }
}

export default UsersRepository;
