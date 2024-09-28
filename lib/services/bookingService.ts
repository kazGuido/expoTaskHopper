// services/bookingService.ts

import { databases, databaseId, ID } from '../appwriteClient';
import { Task } from '../models/Task';

const taskCollectionId = '66ddb56a001913029963'; // Replace with your actual collection ID
const taskApplicationCollectionId = 'your-task-application-collection-id'; // Replace with your actual collection ID

export async function createBooking({ service, location, date, taskers, status, userId }: {
    service: string;
    location: string;
    date: string;
    taskers: string[];
    status: string;
    userId: string;
}): Promise<void> {
    try {
        // Create the task
        const task: Task = {
            id: ID.unique(), // Let Appwrite generate a unique ID
            service_id: service,
            datetime: new Date(date),
            location,
            status: status as "pending" | "accepted" | "in_progress" | "completed" | "cancelled",
            user_id: userId,
            created_at: new Date(),
            updated_at: new Date(),
        };

        await databases.createDocument(databaseId, taskCollectionId, task.id, task);

        // Create task applications for each selected tasker
        for (const taskerId of taskers) {
            await databases.createDocument(databaseId, taskApplicationCollectionId, ID.unique(), {
                service_id: service,
                tasker_id: taskerId,
                status: 'pending',
                applied_at: new Date(),
            });
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}