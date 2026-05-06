import parseAsync from "../validations/parseAsync"
import { createContactSchema, searchContactSchema, updateContactSchema } from "../validations/contact-validation"
import { createContactService, destroyContactService, getContactService, searchContactService, updateContactService } from "../services/contact-service";
import { UserRequest } from "../model/user";
import { NextFunction, Response } from "express";

const create = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(createContactSchema, req.body);

        const result = await createContactService(req.user!.id, validated);

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error);
    }
}

const search = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(searchContactSchema, req.query);

        const { contacts, paging } = await searchContactService(req.user!.id, validated);

        return res.status(200).json({
            data: contacts,
            paging
        })
    } catch (error) {
        next(error);
    }
}

const get = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const contact = await getContactService(req.user!.id, Number(req.params.contactId));

        return res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        await destroyContactService(req.user!.id, Number(req.params.contactId));

        return res.status(200).json({
            data: true
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(updateContactSchema, req.body);

        const contact = await updateContactService(
            req.user!.id,
            Number(req.params.contactId),
            validated
        );

        return res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    search,
    get,
    destroy,
    update
}