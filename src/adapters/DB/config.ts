
import pg , { type Pool } from 'pg';


const pool: Pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
});


export default pool;