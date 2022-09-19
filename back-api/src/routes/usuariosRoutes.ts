import { Router } from "express";
import { usuariosController } from "../controllers/usuariosController"

class UsuariosRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }
    private config() {
        //Insertar usuario
        this.router.post('/', usuariosController.insertarUsu);
        //listar usuarios
        this.router.get('/', usuariosController.listarUsu);
        //ACtualizar usuario
        this.router.put('/', usuariosController.actualizarUsu);
        //Eliminar usuario
        this.router.delete('/:cveUsuario', usuariosController.eliminarUsu);
    }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;