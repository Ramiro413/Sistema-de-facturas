"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Insertar usuario
        this.router.post('/', usuariosController_1.usuariosController.insertarUsu);
        //listar usuarios
        this.router.get('/', usuariosController_1.usuariosController.listarUsu);
        //ACtualizar usuario
        this.router.put('/', usuariosController_1.usuariosController.actualizarUsu);
        //Eliminar usuario
        this.router.delete('/:cveUsuario', usuariosController_1.usuariosController.eliminarUsu);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
