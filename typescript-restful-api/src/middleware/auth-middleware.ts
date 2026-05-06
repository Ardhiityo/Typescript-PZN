import { NextFunction } from "express";
import prisma from "../app/prisma";

async function auth(req: any, res: any, next: NextFunction) {
    if (req.get('Authorization')) {
        const user = await prisma.user.findUnique({
            where: {
                token: req.get('Authorization')
            }
        });

        if (user) {
            req.user = user;
            return next();
        }
    }

    return res.status(401).json({
        errors: "Unauthenticated"
    })
}

export default auth;