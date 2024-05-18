import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config"
import User from "../models/Role";
import Role from "../models/Role";
import { AuthenticatedRequestUserId } from "../types/idUser.type";
import { AuthenticatedDocumentRole } from "../types/roles.type";
//To do:
//Arreglar los errores de este codigo: Token y  user.role

export const verifyToken = async (req: AuthenticatedRequestUserId, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["token"];


        if (!token) return res.status(403).json({ message: "No token provided" })
        //Token
        //     No overload matches this call.
        //     The last overload gave the following error.
        //       Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
        //         Type 'string[]' is not assignable to type 'string'.ts(2769)
        //   index.d.ts(245, 17): The last overload is declared here.
        //                           |
        //                           V
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).json({ mesasage: "no existe el usuario" })

        next()
    } catch (error) {
        return res.status(401).json({ mesasage: "no autorizado" })

    }
}

export const isAdmin = async (req: AuthenticatedRequestUserId, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);
    //User.Roles
    // Property 'roles' does not exist on type 'Document<unknown, {}, { name: string; }> & { name: string; } & { _id: ObjectId; }'.ts(2339)
    // any
    //                                             |
    //                                             V
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }
    }
    return res.status(403).json({ mesasage: "requiere rol de administrador " })
}