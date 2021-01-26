import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserSessionService from '@modules/users/services/CreateUserSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserSession = container.resolve(CreateUserSessionService);

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
  }
}
