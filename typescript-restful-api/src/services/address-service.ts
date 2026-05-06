import prisma from "../app/prisma";
import { CreateAddressRequest, UpdateAddressRequest } from "../validations/address-validation";
import ResponseException from "../exception/response-exception";
import { getContactService } from "./contact-service";

export const createAddressService = async (user_id: number, contact_id: number, data: CreateAddressRequest) => {

    await getContactService(user_id, contact_id);

    return await prisma.address.create({
        data: {
            ...data,
            street: data.street ?? null,
            postal_code: data.postal_code ?? null,
            contact_id: contact_id
        }, select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export const getAddressService = async (user_id: number, contact_id: number) => {

    await getContactService(user_id, contact_id);

    return await prisma.address.findMany({
        where: {
            contact_id: contact_id
        }, select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export const detailAddressService = async (user_id: number, contact_id: number, address_id: number) => {

    await getContactService(user_id, contact_id);

    const address = await prisma.address.findFirst({
        where: {
            id: address_id,
            contact_id: contact_id
        }, select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })

    if (!address) {
        throw new ResponseException('Address not found', 404);
    }

    return address
}

export const updateAddressService = async (user_id: number, contact_id: number, address_id: number, data: UpdateAddressRequest) => {
    await getContactService(user_id, contact_id);

    await detailAddressService(user_id, contact_id, address_id);

    return await prisma.address.update({
        where: {
            id: address_id,
            contact_id: contact_id
        },
        data: {
            ...data,
            street: data.street ?? null,
            postal_code: data.postal_code ?? null
        }, select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export const destroyAddressService = async (user_id: number, contact_id: number, address_id: number) => {

    await getContactService(user_id, contact_id);

    await detailAddressService(user_id, contact_id, address_id);

    await prisma.address.delete({
        where: {
            id: address_id,
            contact_id: contact_id
        }
    });
}

