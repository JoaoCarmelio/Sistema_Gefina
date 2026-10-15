import {Pool} from 'pg'; // pool class

if(!process.env.DATABASE_URL) 
   throw new Error('a variavel DATABASE_URL não está disponível');
   
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;