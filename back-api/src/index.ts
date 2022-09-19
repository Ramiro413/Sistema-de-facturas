import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import facturasRoutes from './routes/facturaRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

class Server {
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void{
        //Configuración del puerto
        this.app.set("port", 3005);

        //Mostrar peticiones 
        this.app.use(morgan("dev"));
        
        //Puertos de conexión de la api
        this.app.use(cors());
        //Permitir solo peticiones json
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes(): void{
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/usuarios", usuariosRoutes);
        this.app.use("/api/facturas", facturasRoutes);

    }
    start(): void{
        this.app.listen(this.app.get("port"), ()=>{
            console.log("Corriendo en servidor", this.app.get("port"));
        })
    }
}
const server = new Server();
server.start();