import { databases, databaseId } from '../appwriteClient';
import { Task } from '../models/Task';

const taskCollectionId = '66ddb56a001913029963'; // Replace with your actual collection ID

export async function fetchTasks(): Promise<Task[]> {
    try {
        const response = await databases.listDocuments(databaseId, taskCollectionId);
        return response.documents.map(doc => doc as unknown as Task);
    } catch (error) {
        console.error('Error fetching Tasks:', error);
        throw error;
    }
}

export async function createTask(task: Task): Promise<Task> {
    try {
        const response = await databases.createDocument(databaseId, taskCollectionId, task.id, task);
        return response as unknown as Task;
    } catch (error) {
        console.error('Error creating Task:', error);
        throw error;
    }
}

export async function updateTaskWithTasker(taskId: string, taskerId: string): Promise<Task> {
    try {
        const response = await databases.updateDocument(databaseId, taskCollectionId, taskId, {
            tasker_id: taskerId,
            status: 'accepted' // Optionally update the status as well
        });
        return response as unknown as Task;
    } catch (error) {
        console.error('Error updating Task with Tasker ID:', error);
        throw error;
    }
}