"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keySecret_1 = __importDefault(require("../config/keySecret"));
const checkJwt = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        let jwtPayload = jsonwebtoken_1.default.verify(token, keySecret_1.default.keys.secret);
        const { iat, exp } = jwtPayload, newData = __rest(jwtPayload, ["iat", "exp"]);
        const newToken = jsonwebtoken_1.default.sign(newData, keySecret_1.default.keys.secret, { expiresIn: '1h' });
        res.setHeader("authorization", newToken);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send("Not Authorized");
    }
};
exports.checkJwt = checkJwt;
