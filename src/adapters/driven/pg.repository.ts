import type { UserRepository } from '../../core/ports/user.repository.js'
import type { User} from '../../core/domain/user.js'
import pool from '../DB/config.js'

export class drivenPg implements UserRepository {

    async findById(id: string): Promise<User | null>{
        const query =`SELECT * FROM tsUser WHERE id = $1`
        const result = await pool.query(query,[id])
        return result.rows[0] || null
    }

    async create(passwordHash: string, number: string): Promise<User> {
        const query = `INSERT INTO tsUser (password , id) VALUES ($1, $2) RETURNING *`
        const result = await pool.query(query,[passwordHash, number])
        return result.rows[0]
    }
    async delete(id: string): Promise<string> {
        const query = `DELETE FROM tsUser WHERE id = $1`
        await pool.query(query,[id])
        return id
    }

    async findAll(): Promise<string> {
        const query = `SELECT * FROM tsUser`
        const result = await pool.query(query)
        return JSON.stringify(result.rows)
    }
}