import { Router } from 'express';
import { commentRoutes } from './routes/commentRoutes';

const routes = Router();

routes.use('/comment', commentRoutes);

export { routes };
