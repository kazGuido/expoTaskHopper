// services/taskApplicationService.ts

import { databases, databaseId } from '../appwriteClient';
import { TaskApplication } from '../models/TaskApplication';

const taskApplicationCollectionId = 'your-task-application-collection-id'; // Replace with your actual collection ID

export async function fetchTaskApplications(): Promise<TaskApplication[]> {
    try {
        const response = await databases.listDocuments(databaseId, taskApplicationCollectionId);
        return response.documents.map(doc => doc as unknown as TaskApplication);
    } catch (error) {
        console.error('Error fetching Task Applications:', error);
        throw error;
    }
}

export async function createTaskApplication(taskApplication: TaskApplication): Promise<TaskApplication> {
    try {
        const response = await databases.createDocument(databaseId, taskApplicationCollectionId, taskApplication.service_id, taskApplication);
        return response as unknown as TaskApplication;
    } catch (error) {
        console.error('Error creating Task Application:', error);
        throw error;
    }
}