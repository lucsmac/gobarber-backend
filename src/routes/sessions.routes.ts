import { Router } from 'express';
import CreateUserSessionService from '../services/CreateUserSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createUserSession = new CreateUserSessionService();

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
