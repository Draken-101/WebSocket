import './dataBase';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import express, { Request, Response } from 'express';
const app = express();

app.get("/ruta-http", (_req: Request, res: Response) => {
    res.status(200).json({
        message: "Respuesta http"
    })
});

app.use(`/chat`, )

const server: any = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (_ws) => { });

server.listen(3000, () => {
    console.log(`¡Todo en marcha y corriendo en el puerto 3000! 🚀🎉`)
});