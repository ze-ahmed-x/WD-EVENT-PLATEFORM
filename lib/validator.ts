import z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(250, 'Title cannot be longer than 250 characters' ),
    description: z.string().min(3, 'Description must be at least 3 characters long').max(400, 'Description cannot be longer than 400 characters' ),
    location: z.string().min(3, 'Location must be at least 3 characters long').max(400, 'Location cannot be longer than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
})