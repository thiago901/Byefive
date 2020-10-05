import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/User/services/CreateSessionService';
import rmPassword from '@utils/removePasswordField';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return response.json({ user: rmPassword(user), token });
  }
}
