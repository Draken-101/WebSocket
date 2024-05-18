"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("./dataBase");
const ws_1 = require("ws");
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/ruta-http", (_req, res) => {
    res.status(200).json({
        message: "Respuesta http"
    });
});
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (_ws) => { });
server.listen(3000, () => {
    (0, dataBase_1.runDB)();
    console.log(`¡Todo en marcha y corriendo en el puerto 3000! 🚀🎉`);
});
