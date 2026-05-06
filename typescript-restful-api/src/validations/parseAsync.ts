import { Request } from "express";
import { ZodType } from "zod";

async function parseAsync<T>(schema: ZodType<T>, data: any): Promise<T> {
    return await schema.parseAsync(data)
}

export default parseAsync;
