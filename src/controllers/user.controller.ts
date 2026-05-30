import { type Request, type Response } from "express";
import UserService from "../services/user.service.ts";
import RoleService from "../services/role.service.ts";

class UserController {
    protected userService;
    protected roleService;
    constructor() {
        this.userService = new UserService();
        this.roleService = new RoleService();
    }

    async index(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.render("users/list", {users});
    }

    async deleteById(req: Request, res: Response) {
        const {id} = req.params;
        await this.userService.delete(id)
        res.redirect('/users');
    }

    async showFormCreate(req: Request, res: Response) {
        const roles = await this.roleService.getAll();
        res.render("users/create", {roles});
    }

    async store(req: Request, res: Response) {
        const data = req.body;
    
        await this.userService.create(data);
        res.redirect('/users');
    }
}

export default UserController;  