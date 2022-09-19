import { Router, RouterOptions } from "express";
import {facturasController } from "../controllers/facturaController";

class FacturasRoutes{
    public router: Router;
    constructor(){
        this.router = Router();
        this.config();
    }
    config(): void{
        this.router.get('/:token', facturasController.listar);
        this.router.post('/', facturasController.insertar);
        this.router.put('/', facturasController.actualizar);
        this.router.delete('/:cveFactura', facturasController.eliminar);

    }
}


const facturasRouter = new FacturasRoutes();
export default facturasRouter.router;