import { Request, Response } from "express";
import dao from "../dao/usuariosDAO";
import validator from 'validator'
import criptjs from 'crypto-js'
import keySecret from "../config/keySecret";

class UsuariosController {
    public async insertarUsu(req: Request, res: Response) {
        try {
            var usuario = req.body;
            
            //Para validar que se pasen todos los campos
           
            if (!usuario.nombre || !usuario.apellidos || !usuario.username || !usuario.password) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 })
            }

            //Para validar campos vacios
            if (validator.isEmpty(usuario.nombre.trim())
                || validator.isEmpty(usuario.apellidos.trim())
                || validator.isEmpty(usuario.username.trim())
                || validator.isEmpty(usuario.password.trim())) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }

            //Encriptación de la contraseña 
            var encryptedText = criptjs.AES.encrypt(usuario.password, keySecret.keys.secret).toString();
            usuario.password = encryptedText;

            const newus = {
                nombre: usuario.nombre.trim(),
                apellidos: usuario.apellidos.trim(),
                username: usuario.username.trim(),
                password: usuario.password.trim()
            }

            const resultado = await dao.insertarUsu(newus);
            if (resultado.affectedRows > 0) {
                return res.json({ message: "Los datos se guardaron correctamente", code: 0 })
            } else {
                return res.status(404).json({ message: resultado.message, code: 1 })
            }

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
    public async listarUsu(req: Request, res: Response) {
        try {

            const result = await dao.listarUsu();

            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
    public async actualizarUsu(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;
            console.log(usuario)
            // validar que los datos no sean nulos o indefinidos
            if (!usuario.cveUsuario
                || !usuario.nombre
                || !usuario.apellidos
                || !usuario.username
                ) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }

            // se verifica que los datos no se encuentren vacios
            if (usuario.cveUsuario <= 0
                || validator.isEmpty(usuario.nombre.trim())
                || validator.isEmpty(usuario.apellidos.trim())
                || validator.isEmpty(usuario.username.trim())) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }

            const newUser = {
                nombre: usuario.nombre.trim(),
                apellidos: usuario.apellidos.trim(),
                username: usuario.username.trim()
            }

            // actualización de los datos
            const result = await dao.actualizarUsu(newUser, usuario.cveUsuario);

            if (result.affectedRows > 0) {
                return res.json({ message: "Los datos se actualizaron correctamente", code: 0 });
            } else {
                return res.status(404).json({ message: result.message, code: 1 });
            }

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }


    public async eliminarUsu(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var { cveUsuario } = req.params;

            // validar que los datos no sean nulos o indefinidos
            if (!cveUsuario) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(cveUsuario.trim())) {
                return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
            }

            // actualización de los datos
            const result = await dao.eliminarUsu(parseInt(cveUsuario));

            if (result.affectedRows > 0) {
                return res.json({ message: "Los datos se eliminaron correctamente", code: 0 });
            } else {
                return res.status(404).json({ message: result.message, code: 1 });
            }

        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

}

export const usuariosController = new UsuariosController();