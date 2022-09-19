import pool from '../database/database';
class FacturasDAO {
    public async listar(cveUsuario: number){
        const resultado = await pool.then(async (conn)=>{
            return await conn.query("Select fact.cveFactura, fact.rfc, fact.direccion, fact.cfid,fact.fechaFactura as fechaFactura  , usu.nombre as nombre from factura fact inner join usuario as usu on usu.cveUsuario = fact.cveRegistro where fact.cveRegistro = ?", [cveUsuario]);
        })
        return resultado;
    }

    public async insertar(factura: any){
        const resultado = await pool.then(async (conn)=>{
            return await conn.query("insert into factura set ?", [factura]);
        })
        return resultado;

    }

    public async eliminar(cveFactura: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " DELETE FROM factura WHERE cveFactura = ? ", [cveFactura]);
        });
        return result;
    }
    public async actualizar(factura: any, cveFactura: number) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " UPDATE factura SET ? WHERE cveFactura = ? ", [factura, cveFactura]);
        });
        return result;
    }
}

const dao = new FacturasDAO();
export default dao;
