import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: uuid(), token: uuid(), user_id });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUsersTokenRepository;
