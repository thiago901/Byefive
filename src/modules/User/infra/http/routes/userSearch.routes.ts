import { Router } from 'express';

import UsersSearchControllers from '@modules/User/infra/http/controllers/UsersSearchControllers';

const routeUser = Router();

const usersSearchControllers = new UsersSearchControllers();

routeUser.get('/', usersSearchControllers.index);

export default routeUser;
