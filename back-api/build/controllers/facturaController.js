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
exports.facturasController = void 0;
const facturaDAO_1 = __importDefault(require("../dao/facturaDAO"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keySecret_1 = __importDefault(require("../config/keySecret"));
class FacturasController {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var { token } = req.params;
                console.log(token);
                let jwtPayload = jsonwebtoken_1.default.verify(token, keySecret_1.default.keys.secret);
                const resultado = yield facturaDAO_1.default.listar(jwtPayload.cveUsuario);
                return res.json(resultado);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factura = req.body;
                const updatefactura = {
                    rfc: factura.rfc.trim(),
                    direccion: factura.direccion.trim(),
                    cfid: factura.cfid,
                    fechaFactura: factura.fechaFactura
                };
                const resultado = yield facturaDAO_1.default.actualizar(updatefactura, factura.cveFactura);
                if (resultado.affectedRows > 0) {
                    return res.json({ message: "Los datos se actualizarón correctamente", code: 1 });
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
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var { cveFactura } = req.params;
                if (!cveFactura) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                if (validator_1.default.isEmpty(cveFactura.trim())) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                const resultado = yield facturaDAO_1.default.eliminar(parseInt(cveFactura));
                if (resultado.affectedRows > 0) {
                    return res.json({ message: "Se elimino correctamente", code: 0 });
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
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var factura = req.body;
                if (!factura.rfc || !factura.direccion || !factura.cfid || !factura.fechaFactura) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1 });
                }
                if (factura.cfid < 1 || factura.cfid > 4) {
                    return res.status(404).json({ message: "El CFID debe tener una de las 4 opciones posibles", code: 1 });
                }
                if (factura.rfc.trim().toString().length != 13) {
                    return res.status(404).json({ message: "El RFC debe contener 13 caracteres", code: 1 });
                }
                let jwtPayload = jsonwebtoken_1.default.verify(factura.token, keySecret_1.default.keys.secret);
                const newfactura = {
                    rfc: factura.rfc.trim(),
                    direccion: factura.direccion.trim(),
                    cfid: factura.cfid,
                    fechaFactura: factura.fechaFactura,
                    cveRegistro: jwtPayload.cveUsuario
                };
                const resultado = yield facturaDAO_1.default.insertar(newfactura);
                if (resultado.affectedRows > 0) {
                    return res.json({ message: "Los datos se guardaron correctamente", code: 1 });
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
}
exports.facturasController = new FacturasController();
