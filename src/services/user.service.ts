import Role from "../database/entities/role.entity.ts";
import User from "../database/entities/user.entity.ts";
import RoleRepository from "../repositories/role.repository.ts";
import UserRepository from "../repositories/user.repository.ts";

class UserService {
    protected userRepository;
    protected roleRepository;
    constructor() {
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }

    async getAllUsers() {
        return await this.userRepository.getAll();
    }

    async delete(id: any) {
        const userDelete = await this.userRepository.findById(id);
        if (!userDelete) {
            throw new Error("User not found");
        }
        return await this.userRepository.delete(userDelete);
    }

    async create(data: any) {

        const user = new User();
        user.email = data.email;
        user.password = data.password;
        user.name = data.name;
        user.address = data.address;

        // roles
        const dataRoles = data.roles;
        const roles = await this.roleRepository.findByIds(dataRoles);

        if (Array.isArray(roles) && roles.length > 0) {
            user.roles = roles;
        }
        return await this.userRepository.save(user);
    }
}

export default UserService;

