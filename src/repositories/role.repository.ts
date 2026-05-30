import { In, ObjectLiteral } from "typeorm";
import Role from "../database/entities/role.entity.ts";
import BaseRepository from "./base.repository.ts";

class RoleRepository extends BaseRepository {
    constructor() {
        super(Role)
    }

    async findById(id: any): Promise<ObjectLiteral | null> {
        return await this.repository.findOne(id);
    }

    async findByIds(ids: number[]): Promise<ObjectLiteral | Role[]> {
        return await this.repository.find({ where: { id: In(ids) }, relations: { users: true } });
    }
}

export default RoleRepository;