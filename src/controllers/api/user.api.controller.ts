import { type Request, type Response } from "express";
import UserService from "../../services/user.service.ts";
import RoleService from "../../services/role.service.ts";

class UserApiController {
    protected userService;
    protected roleService;
    constructor() {
        this.userService = new UserService();
        this.roleService = new RoleService();
    }

    async index(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async deleteById(req: Request, res: Response) {
        try{
            const {id} = req.params;
            await this.userService.delete(id)
            res.json({message: "delete user succes"})
        }catch(e: any) {
            res.json({message: e.message})
        }
    }

    async store(req: Request, res: Response) {
        const data = req.body;
        console.log(data);
        //await this.userService.create(data);
        res.redirect('/users');
    }
}

export default UserApiController;  