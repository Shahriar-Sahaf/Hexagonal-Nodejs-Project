import type {UserRepository} from '../ports/user.repository.js'
import { IAuthServicePort } from '../ports/auth.service.port.js';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class authService implements IAuthServicePort{

    constructor(private userRepository: UserRepository) {}


    public async loginOrRegister(idNumber: string, password: string): Promise<{ token: string }> {
        let user = await this.userRepository.findById(idNumber)
        if (!user) {
            const passwordHash = await bcrypt.hash(password, 10);
            user = await this.userRepository.create(passwordHash, idNumber);
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            throw new Error('Invalid credentials!')
        }

        const jwtSecret = process.env.JWT_SECRET || 'default-secret-change-this';
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '24h' })
        return { token }
    }

    public async remove(idNumber : string) : Promise<string>{
        const result = await this.userRepository.delete(idNumber)
        return result
    }
    
    public async getAllUsers(): Promise<string> {
        const users = await this.userRepository.findAll();
        return JSON.stringify(users);
    }

    
}