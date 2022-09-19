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
class FacturasDAO {
    listar(cveUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield database_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                return yield conn.query("Select fact.cveFactura, fact.rfc, fact.direccion, fact.cfid,fact.fechaFactura as fechaFactura  , usu.nombre as nombre from factura fact inner join usuario as usu on usu.cveUsuario = fact.cveRegistro where fact.cveRegistro = ?", [cveUsuario]);
            }));
            return resultado;
        });
    }
    insertar(factura) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield database_1.default.then((conn) => __awaiter(this, void 0, void 0, function* () {
                return yield conn.query("insert into factura set ?", [factura]);
            }));
            return resultado;
        });
    }
    eliminar(cveFactura) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" DELETE FROM factura WHERE cveFactura = ? ", [cveFactura]);
            }));
            return result;
        });
    }
    actualizar(factura, cveFactura) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.then((connection) => __awaiter(this, void 0, void 0, function* () {
                return yield connection.query(" UPDATE factura SET ? WHERE cveFactura = ? ", [factura, cveFactura]);
            }));
            return result;
        });
    }
}
const dao = new FacturasDAO();
exports.default = dao;
