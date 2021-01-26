import { Router } from 'express';

import CreateUserSessionService from '@modules/users/services/CreateUserSessionService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUserSession = new CreateUserSessionService(usersRepository);

  const { user, token } = await createUserSession.execute({
    email,
    password,
  });

  const userDataWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: userDataWithoutPassword, token });
});

export default sessionsRouter;
