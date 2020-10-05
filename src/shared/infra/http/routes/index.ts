import { Router } from 'express';

import userRoute from '@modules/User/infra/http/routes/user.routes';
import userSearchRoute from '@modules/User/infra/http/routes/userSearch.routes';
import sessionsRoute from '@modules/User/infra/http/routes/sessions.routes';

const route = Router();

route.use('/users', userRoute);
route.use('/search', userSearchRoute);
route.use('/sessions', sessionsRoute);

export default route;
