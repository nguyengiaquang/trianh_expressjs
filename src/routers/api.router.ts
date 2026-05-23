import { Router, type Request, type Response } from 'express';
import UserApiController from '../controllers/api/user.api.controller.ts';

const apiRouter = Router();

const userAPIController = new UserApiController();

apiRouter.get('/users', (req: Request, res: Response) => userAPIController.index(req, res));
apiRouter.delete("/users/:id",(req: Request, res: Response) => userAPIController.deleteById(req, res) )

export default apiRouter;