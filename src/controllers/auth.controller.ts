import { Request, Response } from 'express';
import AuthService from '../services/auth.service.ts';

class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    showFormLogin(req: Request, res: Response): void {
        const email = req.cookies.email ?? "";
        res.render('auth/login', { email })
    }
    async handleLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            if (!user) {
                res.redirect('/auth/login');
            }
            res.cookie("email", email);
            // save user login to session
            req.session.user = user;
            res.redirect('/users');
        } catch (error) {
            console.log(error);
            res.redirect('/auth/login');
        }
    }

    async handleLogout(req: Request, res: Response) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/users');
                }
                res.redirect('/auth/login');
            });
        } catch (error) {
            console.log(error);
            res.redirect('/users');
        }
    }

    async showProfile(req: Request, res: Response) {
        const userLogin = req.session.user;
        res.render('auth/profile', { userLogin })
    }
}

export default AuthController;