import { Request, Response } from "express";
import dao from "../dao/authDAO";
import jwt from 'jsonwebtoken';
import keySecret from "../config/keySecret";
import validator from 'validator';
import criptjs from 'crypto-js'


class AuthController{
    public async logIn(req: Request, res: Response){
        try {
            //get de datos del body
            const {username, password, ...rest} = req.body;
            //Se valida la estructura de la petición 
            if(Object.keys(rest).length > 0){
                return res.status(400).json({message: "La estructura no es correcta", code : 1})
            }

            //Se valida que los datos de la petición existan
            if(!username || !password){
                return res.status(400).json({message: "Todos los campos son obligatorios", code : 1})
            }

            if(validator.isEmpty(username.trim()) || validator.isEmpty(password.trim())){
                return res.status(404).json({message: "El usuario y/o constraseña es incorrecto", code:1})

            }
            const lstUsers = await dao.getuserByname(username);
            if(lstUsers.length <= 0) {
                return res.status(404).json({message: "El usuario y/o contraseña es incorrecto", code: 1})
            }

            for(let usuario of lstUsers){
                const encryptedText = criptjs.AES.decrypt(usuario.password, keySecret.keys.secret);
                usuario.password = encryptedText.toString(criptjs.enc.Utf8);

                console.log(usuario.password)
                if (usuario.password == password){
                    const {password, ...newus} = usuario;
                  
                    var token = jwt.sign(newus, keySecret.keys.secret, {expiresIn: '1h'});
                    
                    return res.json({message: "Autentificación correcta", token, code:0});
                    
                }else{
                    return res.status(404).json({message: "El usuario y/o contraseña es incorrecto", code: 1})

                }
            }

        } catch (error: any) {
            return res.status(500).json({message: `${error.message}`});
        }
    }
}

export const authController = new AuthController();

