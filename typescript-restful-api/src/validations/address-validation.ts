import z from "zod";

export const createAddressSchema = z.object({
    street: z.string().min(3).max(100).optional(),
    city: z.string().min(3).max(100),
    province: z.string().min(3).max(100),
    country: z.string().min(3).max(100),
    postal_code: z.string().min(3).max(100).optional()
})

export const updateAddressSchema = z.object({
    street: z.string().min(3).max(100).optional(),
    city: z.string().min(3).max(100),
    province: z.string().min(3).max(100),
    country: z.string().min(3).max(100),
    postal_code: z.string().min(3).max(100).optional()
})

export type CreateAddressRequest = z.infer<typeof createAddressSchema>;
export type UpdateAddressRequest = z.infer<typeof updateAddressSchema>;