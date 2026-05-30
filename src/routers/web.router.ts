import { Router, type Request, type Response } from 'express';
import AuthController from '../controllers/auth.controller.ts';
import UserController from '../controllers/user.controller.ts';
import WeatherController from '../controllers/weather.controller.ts';

const router = Router();

const authController = new AuthController();
const userController = new UserController();

router.get('/auth/login', (req: Request, res: Response) => authController.showFormLogin(req, res));
router.post('/auth/login', (req: Request, res: Response) => authController.handleLogin(req, res));


router.use((req: Request, res: Response, next: any) => {
    // Kiem tra session user duoc khoi tao chua
    if (!req.session.user) {
        res.redirect('/auth/login');
        return;
    }
    next();
})
router.get("/auth/logout", (req: Request, res: Response) => authController.handleLogout(req, res))
router.get("/auth/profile", (req: Request, res: Response) => authController.showProfile(req, res))
router.get('/users', (req: Request, res: Response) => userController.index(req, res));
router.get('/users/:id/delete', (req: Request, res: Response) => userController.deleteById(req, res));
router.get('/users/create', (req: Request, res: Response) => userController.showFormCreate(req, res));
router.post('/users/store', (req: Request, res: Response) => userController.store(req, res));
router.get('/weather', WeatherController.index);


export default router;