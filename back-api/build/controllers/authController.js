"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.authController = void 0;
const authDAO_1 = __importDefault(require("../dao/authDAO"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keySecret_1 = __importDefault(require("../config/keySecret"));
const validator_1 = __importDefault(require("validator"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class AuthController {
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get de datos del body
                const _a = req.body, { username, password } = _a, rest = __rest(_a, ["username", "password"]);
                //Se valida la estructura de la petición 
                if (Object.keys(rest).length > 0) {
                    return res.status(400).json({ message: "La estructura no es correcta", code: 1 });
                }
                //Se valida que los datos de la petición existan
                if (!username || !password) {
                    return res.status(400).json({ message: "Todos los campos son obligatorios", code: 1 });
                }
                if (validator_1.default.isEmpty(username.trim()) || validator_1.default.isEmpty(password.trim())) {
                    return res.status(404).json({ message: "El usuario y/o constraseña es incorrecto", code: 1 });
                }
                const lstUsers = yield authDAO_1.default.getuserByname(username);
                if (lstUsers.length <= 0) {
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                for (let usuario of lstUsers) {
                    const encryptedText = crypto_js_1.default.AES.decrypt(usuario.password, keySecret_1.default.keys.secret);
                    usuario.password = encryptedText.toString(crypto_js_1.default.enc.Utf8);
                    console.log(usuario.password);
                    if (usuario.password == password) {
                        const { password } = usuario, newus = __rest(usuario, ["password"]);
                        var token = jsonwebtoken_1.default.sign(newus, keySecret_1.default.keys.secret, { expiresIn: '1h' });
                        return res.json({ message: "Autentificación correcta", token, code: 0 });
                    }
                    else {
                        return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthController();
