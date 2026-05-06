import z from "zod";

export const createContactSchema = z.object({
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100).optional(),
    email: z.email(),
    phone: z.string().startsWith('+').min(5).max(15)
})

export const updateContactSchema = z.object({
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100).optional(),
    email: z.email(),
    phone: z.string().startsWith('+').min(5).max(15)
})

export const searchContactSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    page: z.coerce.number().min(1).positive().optional(),
    size: z.coerce.number().min(1).max(100).positive().optional()
})

export type CreateContactRequest = z.infer<typeof createContactSchema>;
export type UpdateContactRequest = z.infer<typeof updateContactSchema>;
export type SearchContactRequest = z.infer<typeof searchContactSchema>;