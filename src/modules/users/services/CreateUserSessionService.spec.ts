import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import CreateUserSessionService from './CreateUserSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to autenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserSessionService = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await createUserSessionService.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to autenticate with a wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserSessionService = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(
      createUserSessionService.execute({
        email: 'johndoe@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserSessionService = new CreateUserSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createUserSessionService.execute({
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
