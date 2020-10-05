import { Router } from 'express';

import SessionsController from '@modules/User/infra/http/controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();

sessionRoutes.post('/', sessionsController.create);

export default sessionRoutes;
