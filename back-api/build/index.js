"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const facturaRoutes_1 = __importDefault(require("./routes/facturaRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        //Configuración del puerto
        this.app.set("port", 3005);
        //Mostrar peticiones 
        this.app.use((0, morgan_1.default)("dev"));
        //Puertos de conexión de la api
        this.app.use((0, cors_1.default)());
        //Permitir solo peticiones json
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/usuarios", usuariosRoutes_1.default);
        this.app.use("/api/facturas", facturaRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Corriendo en servidor", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
