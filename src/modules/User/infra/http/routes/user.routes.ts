import { Router } from 'express';

import UserController from '@modules/User/infra/http/controllers/UsersControllers';
import ensureAuthenticad from '@modules/User/infra/http/middlewares/ensureAuthenticad';

const routeUser = Router();

const userController = new UserController();

routeUser.post('/', userController.create);

routeUser.use(ensureAuthenticad);

routeUser.put('/', userController.update);
routeUser.delete('/:id', userController.delete);
routeUser.get('/', userController.index);
routeUser.get('/:id', userController.show);

export default routeUser;
