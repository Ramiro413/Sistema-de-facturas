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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
const usuariosDAO_1 = __importDefault(require("../dao/usuariosDAO"));
const validator_1 = __importDefault(require("validator"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const keySecret_1 = __importDefault(require("../config/keySecret"));
class UsuariosController {
    insertarUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var usuario = req.body;
                //Para validar que se pasen todos los campos
                if (!usuario.nombre || !usuario.apellidos || !usuario.username || !usuario.password) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                //Para validar campos vacios
                if (validator_1.default.isEmpty(usuario.nombre.trim())
                    || validator_1.default.isEmpty(usuario.apellidos.trim())
                    || validator_1.default.isEmpty(usuario.username.trim())
                    || validator_1.default.isEmpty(usuario.password.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                //Encriptación de la contraseña 
                var encryptedText = crypto_js_1.default.AES.encrypt(usuario.password, keySecret_1.default.keys.secret).toString();
                usuario.password = encryptedText;
                const newus = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim(),
                    username: usuario.username.trim(),
                    password: usuario.password.trim()
                };
                const resultado = yield usuariosDAO_1.default.insertarUsu(newus);
                if (resultado.affectedRows > 0) {
                    return res.json({ message: "Los datos se guardaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: resultado.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    listarUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuariosDAO_1.default.listarUsu();
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    actualizarUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var usuario = req.body;
                console.log(usuario);
                // validar que los datos no sean nulos o indefinidos
                if (!usuario.cveUsuario
                    || !usuario.nombre
                    || !usuario.apellidos
                    || !usuario.username) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (usuario.cveUsuario <= 0
                    || validator_1.default.isEmpty(usuario.nombre.trim())
                    || validator_1.default.isEmpty(usuario.apellidos.trim())
                    || validator_1.default.isEmpty(usuario.username.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                const newUser = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim(),
                    username: usuario.username.trim()
                };
                // actualización de los datos
                const result = yield usuariosDAO_1.default.actualizarUsu(newUser, usuario.cveUsuario);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos se actualizaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: result.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    eliminarUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var { cveUsuario } = req.params;
                // validar que los datos no sean nulos o indefinidos
                if (!cveUsuario) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // se verifica que los datos no se encuentren vacios
                if (validator_1.default.isEmpty(cveUsuario.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                // actualización de los datos
                const result = yield usuariosDAO_1.default.eliminarUsu(parseInt(cveUsuario));
                if (result.affectedRows > 0) {
                    return res.json({ message: "Los datos se eliminaron correctamente", code: 0 });
                }
                else {
                    return res.status(404).json({ message: result.message, code: 1 });
                }
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuariosController = new UsuariosController();
