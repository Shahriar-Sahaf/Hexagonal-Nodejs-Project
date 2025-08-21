
import pg , { type Pool } from 'pg';


const pool: Pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
});

export const createTableProject = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS projects(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `;
    await pool.query(query);
};

export default pool;
