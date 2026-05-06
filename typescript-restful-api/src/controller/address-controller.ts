import { NextFunction, Response } from "express";
import { UserRequest } from "../model/user";
import parseAsync from "../validations/parseAsync";
import { createAddressSchema, updateAddressSchema } from "../validations/address-validation";
import { createAddressService, destroyAddressService, detailAddressService, getAddressService, updateAddressService } from "../services/address-service";

const create = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(createAddressSchema, req.body);

        const contact = await createAddressService(
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

const get = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const contact = await getAddressService(
            req.user!.id,
            Number(req.params.contactId)
        );

        return res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error);
    }
}

const detail = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const contact = await detailAddressService(
            req.user!.id,
            Number(req.params.contactId),
            Number(req.params.addressId)
        );

        return res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error);
    }
}

const update = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        const validated = await parseAsync(updateAddressSchema, req.body);

        const contact = await updateAddressService(
            req.user!.id,
            Number(req.params.contactId),
            Number(req.params.addressId),
            validated
        );

        return res.status(200).json({
            data: contact
        })
    } catch (error) {
        next(error);
    }
}

const destroy = async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        await destroyAddressService(
            req.user!.id,
            Number(req.params.contactId),
            Number(req.params.addressId)
        );

        return res.status(200).json({
            data: true
        })
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    get,
    detail,
    update,
    destroy
}