import pool from '../database/database';
class AuthDao{
    public async getuserByname(username: string){
        const result = await pool.then(async (conn)=>{
            return await conn.query( "select * from usuario where username = ?", [username])
        });
        return result;
    }
}

const dao = new AuthDao();
export default dao;