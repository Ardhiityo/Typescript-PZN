import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "../validations/contact-validation"
import prisma from "../app/prisma"
import ResponseException from "../exception/response-exception";

export const createContactService = async (user_id: number, data: CreateContactRequest) => {
    return await prisma.contact.create({
        data: {
            ...data,
            last_name: data.last_name ?? null,
            user_id: user_id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });
}

export const searchContactService = async (user_id: number, data: SearchContactRequest) => {

    const filters: object[] = []

    if (data.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: data.name
                    }
                },
                {
                    last_name: {
                        contains: data.name
                    }
                }
            ]
        })
    }

    if (data.email) {
        filters.push({
            email: {
                contains: data.email
            }
        })
    }

    if (data.phone) {
        filters.push({
            phone: {
                contains: data.phone
            }
        })
    }

    const take = (data.size && !isNaN(data.size)) ? data.size : 10;
    const page = (data.page && !isNaN(data.page)) ? data.page : 1;
    const skip = take * (page - 1);

    const contacts = await prisma.contact.findMany({
        where: {
            user_id: user_id,
            AND: filters
        },
        skip: skip,
        take: take
    })

    const total_item = await prisma.contact.count({
        where: {
            user_id: user_id,
            AND: filters
        }
    });

    return {
        contacts,
        paging: {
            total_item: total_item,
            total_page: Math.ceil(total_item / take),
            page: page
        }
    }
}

export const getContactService = async (user_id: number, contact_id: number) => {
    const contact = await prisma.contact.findFirst({
        where: {
            user_id: user_id,
            id: contact_id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

    if (!contact) {
        throw new ResponseException('Contact not found', 404);
    }

    return contact;
}

export const destroyContactService = async (user_id: number, contact_id: number) => {

    await getContactService(user_id, contact_id);

    await prisma.contact.delete({
        where: {
            user_id: user_id,
            id: contact_id
        }
    });
}

export const updateContactService = async (user_id: number, contact_id: number, data: UpdateContactRequest) => {

    await getContactService(user_id, contact_id);

    return await prisma.contact.update({
        where: {
            id: contact_id,
            user_id: user_id
        },
        data: {
            ...data,
            last_name: data.last_name ?? null,
            user_id: user_id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    });

}

