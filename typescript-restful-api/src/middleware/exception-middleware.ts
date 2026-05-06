import { ZodError } from "zod";
import logger from "../app/logging";
import ResponseException from "../exception/response-exception";

function exception(err: Error, req: any, res: any, next: any) {
    if (err instanceof ZodError) {
        const errors: object[] = [];
        err.issues.forEach(value => {
            errors.push({ [String(value.path[0])]: value.message });
        });
        return res.status(400).json({
            errors: errors
        });
    } else if (err instanceof ResponseException) {
        return res.status(err.statusCode).json({
            errors: err.message
        });
    }

    logger.info({ message: err.message, stack: err.stack });

    return res.status(500).json({
        errors: 'Internal Server Error'
    })
}

export default exception;