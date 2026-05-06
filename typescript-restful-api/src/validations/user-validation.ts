import z from "zod";
import prisma from "../app/prisma";

export const registerUserSchema = z.object({
    username: z.string().min(3).max(100).refine(async (data) => {
        const user = await prisma.user.findUnique({
            where: {
                username: data
            }
        })
        return !user;
    }, 
    {
        message: "The username field is already exists"
    }),
    password: z.string().min(8).max(100),
    name: z.string().min(3).max(100)
})

export const loginUserSchema = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(8).max(100)
})

export const updateUserSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    password: z.string().min(8).max(100).optional()
})

export type RegisterUserRequest = z.infer<typeof registerUserSchema>;
export type LoginUserRequest = z.infer<typeof loginUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;