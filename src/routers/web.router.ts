import { Router, type Request, type Response } from 'express';
import UserController from '../controllers/user.controller.ts';
import WeatherController from '../controllers/weather.controller.ts';

const router = Router();


const userController = new UserController();

router.get('/users', (req: Request, res: Response) => userController.index(req, res));
router.get('/users/:id/delete', (req: Request, res: Response) => userController.deleteById(req, res));
router.get('/users/create', (req: Request, res: Response) => userController.showFormCreate(req, res));
router.post('/users/store', (req: Request, res: Response) => userController.store(req, res));
router.get('/weather', WeatherController.index);


export default router;