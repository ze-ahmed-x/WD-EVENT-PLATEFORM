"use server"

import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model";
import { handleError } from "../utils";
import User from "../database/models/user.model";

export async function createEvent({event, userId}: CreateEventParams) {
    try {
        await connectToDatabase();
        const organizer = await User.findById(userId);
        if (!organizer) throw new Error('User not found');
        const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId});
        if (!newEvent) throw new Error('Could not create event');
        return JSON.parse(JSON.stringify(newEvent));
        
    } catch (error) {
        handleError(error);
    }
}