import { Request, Response } from "express";
import dao from "../dao/facturaDAO";
import validator from "validator";
import jwt from 'jsonwebtoken';
import keySecret from "../config/keySecret";
import {LocalStorage} from 'node-localstorage';

class FacturasController {
    public async listar(req: Request, res: Response) {
        try {
            var { token } = req.params;
           
            console.log(token)
            let jwtPayload = <any>jwt.verify(token, keySecret.keys.secret);
            
            const resultado = await dao.listar(jwtPayload.cveUsuario);
            return res.json(resultado)
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            const factura = req.body;
            

            const updatefactura = {
                rfc: factura.rfc.trim(),
                direccion: factura.direccion.trim(),
                cfid: factura.cfid,
                fechaFactura: factura.fechaFactura
            }
            const resultado = await dao.actualizar(updatefactura, factura.cveFactura);

            if (resultado.affectedRows > 0) {
                return res.json({ message: "Los datos se actualizarón correctamente", code: 1 })
            } else {

                return res.status(404).json({ message: resultado.message, code: 1 });

            }
        } catch (error: any) {

            return res.status(500).json({ message: `${error.message}` });
        }
    }
    public async eliminar(req: Request, res: Response) {
        try {
            var { cveFactura } = req.params;
            if (!cveFactura) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });

            }
            if (validator.isEmpty(cveFactura.trim())) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }
            const resultado = await dao.eliminar(parseInt(cveFactura));

            if (resultado.affectedRows > 0) {
                return res.json({ message: "Se elimino correctamente", code: 0 });
            } else {
                return res.status(404).json({ message: resultado.message, code: 1 });
            }

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
    public async insertar(req: Request, res: Response) {
        try {
            var factura = req.body;
            if (!factura.rfc || !factura.direccion || !factura.cfid || !factura.fechaFactura ) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 })
            }

            if(factura.cfid <1 || factura.cfid >4){
                return res.status(404).json({ message: "El CFID debe tener una de las 4 opciones posibles", code: 1 })
            }
            if (factura.rfc.trim().toString().length != 13) {
                return res.status(404).json({ message: "El RFC debe contener 13 caracteres", code: 1 })

            }
            let jwtPayload = <any>jwt.verify(factura.token, keySecret.keys.secret);
            const newfactura = {
                rfc: factura.rfc.trim(),
                direccion: factura.direccion.trim(),
                cfid: factura.cfid,
                fechaFactura: factura.fechaFactura,
                cveRegistro: jwtPayload.cveUsuario
            }
  
        
  
            const resultado = await dao.insertar(newfactura );
            

            if (resultado.affectedRows > 0) {
                return res.json({ message: "Los datos se guardaron correctamente", code: 1 })
            } else {
                return res.status(404).json({ message: resultado.message, code: 1 });

            }
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}

export const facturasController = new FacturasController();