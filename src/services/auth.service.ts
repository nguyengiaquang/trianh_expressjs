import UserRepository from "../repositories/user.repository.ts";

class AuthService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async login(email: string, password: string) {
        const user = await this.userRepository.checkExistUser(email, password);
        if (!user) {
            throw new Error('User not found');
        }        
        return user;
    }
}

export default AuthService;