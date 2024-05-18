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
exports.runDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        require('dotenv').config();
        const dbUri = process.env.URI_DATABASE || "";
        try {
            yield mongoose_1.default.connect(dbUri, {});
            console.log(`¡Conexión a la base de datos establecida correctamente! 🎉🚀`);
        }
        catch (error) {
            console.error(`
            Oops! ¡Hubo un error al conectar a la base de datos! 😔🔥
            ---------------------------------------------------------
            ${error}
            ---------------------------------------------------------
        `);
            throw error; // Lanzar la excepción para que quien llame a esta función pueda manejarla
        }
    });
}
exports.runDB = runDB;
