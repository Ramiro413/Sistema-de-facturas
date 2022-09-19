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
const database_1 = __importDefault(require("../database/database"));
class usuariosDAO {
    insertarUsu(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield database_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                return yield conn.query("INSERT INTO usuario SET ?", [usuario]);
            }));
            return resultado;
        });
    }
    listarUsu() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" SELECT cveUsuario, nombre, apellidos, username FROM usuario  ");
            }));
            return result;
        });
    }
    actualizarUsu(usuario, cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE usuario SET ? WHERE cveUsuario = ? ", [usuario, cveUsuario]);
            }));
            return result;
        });
    }
    eliminarUsu(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM usuario WHERE cveUsuario = ? ", [cveUsuario]);
            }));
            return result;
        });
    }
}
const dao = new usuariosDAO();
exports.default = dao;
