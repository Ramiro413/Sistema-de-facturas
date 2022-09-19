import pool from '../database/database';

class usuariosDAO{
    public async insertarUsu(usuario: any){
        const resultado = await pool.then(async (conn)=>{
            return await conn.query("INSERT INTO usuario SET ?", [usuario]);
        })
        return resultado;
    }
    public async listarUsu() {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " SELECT cveUsuario, nombre, apellidos, username FROM usuario  ");
        });
        return result;
    }
    public async actualizarUsu(usuario: any, cveUsuario: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " UPDATE usuario SET ? WHERE cveUsuario = ? ", [usuario, cveUsuario]);
        });
        return result;
    }

    public async eliminarUsu(cveUsuario: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " DELETE FROM usuario WHERE cveUsuario = ? ", [cveUsuario]);
        });
        return result;
    }
}

const dao = new usuariosDAO();
export default dao;