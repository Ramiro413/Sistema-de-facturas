import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import keySecret from "../config/keySecret";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = <string>req.headers["authorization"];
        let jwtPayload = <any>jwt.verify(token, keySecret.keys.secret);
        
        
        const {iat, exp, ...newData} = jwtPayload;
        const newToken = jwt.sign(newData, keySecret.keys.secret, { expiresIn: '1h' });
        res.setHeader("authorization", newToken);

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send("Not Authorized");
    }
}