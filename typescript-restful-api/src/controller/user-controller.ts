import { loginUserSchema, registerUserSchema, updateUserSchema } from "../validations/user-validation"
import parseAsync from "../validations/parseAsync";
import { loginUserService, logoutUserService, registerUserService, updateUserService } from "../services/user-services";
import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../model/user";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(registerUserSchema, req.body);

        const register = await registerUserService(validated);

        return res.status(200).json({
            data: register
        })
    } catch (error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(loginUserSchema, req.body);

        const register = await loginUserService(validated);

        return res.status(200).json({
            data: register
        })
    } catch (error) {
        next(error);
    }
}

const current = (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({
            data: {
                id: req.user?.id,
                username: req.user?.username,
                name: req.user?.name
            }
        });
    } catch (error) {
        next(error);
    }
}

const logout = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        await logoutUserService(req.user!.id);

        return res.status(200).json({
            data: true
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(updateUserSchema, req.body);

        const user = await updateUserService(req.user!.id, validated);

        return res.status(200).json({
            data: user
        })
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login,
    current,
    logout,
    update
}