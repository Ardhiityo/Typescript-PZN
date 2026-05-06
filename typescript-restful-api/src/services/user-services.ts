import ResponseException from "../exception/response-exception";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest } from "../validations/user-validation"
import prisma from "../app/prisma"
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

export const registerUserService = async (data: RegisterUserRequest) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            username: data.username,
            password: await bcrypt.hash(data.password, 12)
        },
        select: {
            id: true,
            username: true,
            name: true
        }
    })
}

export const loginUserService = async (data: LoginUserRequest) => {
    const user = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    })

    if (user) {
        if (await bcrypt.compare(data.password, user.password)) {
            return await prisma.user.update({
                where: {
                    username: user.username
                },
                data: {
                    token: crypto.randomUUID()
                },
                select: {
                    id: true,
                    username: true,
                    name: true,
                    token: true
                }
            })
        }
    }

    throw new ResponseException('Username or Password is wrong', 401);
}

export const logoutUserService = async (id: number) => {
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            token: null
        }
    })
}

export const updateUserService = async (id: number, data: UpdateUserRequest) => {
    const updateData: Prisma.UserUpdateInput = {};

    if (data.name) {
        updateData.name = data.name;
    }
    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 12);
    }

    return await prisma.user.update({
        where: {
            id: id
        },
        data: updateData,
        select: {
            id: true,
            username: true,
            name: true
        }
    })
}
