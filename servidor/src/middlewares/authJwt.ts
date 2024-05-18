import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config"
import User from "../models/Role";
import Role from "../models/Role";
import { AuthenticatedRequestUserId } from "../types/idUser.type";
import { AuthenticatedDocumentRole } from "../types/roles.type";

export const verifyToken = async (req: AuthenticatedRequestUserId, res: Response, next: NextFunction) => {
   try {
      const token = req.headers["token"];


      if (!token) return res.status(403).json({ message: "No token provided" })

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
   const roles = await Role.find({ _id: { $in: user.roles}});

   for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
         next()
         return;
      }
   }
   return res.status(403).json({ mesasage: "requiere rol de administrador " })
}