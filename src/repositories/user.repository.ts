import BaseRepository from "./base.repository.ts";
import User from "../database/entities/user.entity.ts";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email: string) {
        return await this.repository.findOne({ where: { email } });
    }

    async delete(user: any) {
        return await this.repository.softRemove(user);
    }

    async checkExistUser(email: string, password: string) {
        return await this.repository.findOne({ where: { email, password } });
    }

    async save(user: User) {
        return await this.repository.save(user);
    }

}

export default UserRepository;