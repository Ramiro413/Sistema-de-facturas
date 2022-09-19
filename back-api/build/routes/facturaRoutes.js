"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaController_1 = require("../controllers/facturaController");
class FacturasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:token', facturaController_1.facturasController.listar);
        this.router.post('/', facturaController_1.facturasController.insertar);
        this.router.put('/', facturaController_1.facturasController.actualizar);
        this.router.delete('/:cveFactura', facturaController_1.facturasController.eliminar);
    }
}
const facturasRouter = new FacturasRoutes();
exports.default = facturasRouter.router;
