import { databases, databaseId } from '../appwriteClient';
import { Service } from '../models/Service';

const serviceCollectionId = '66ddb7d7003133b27ce0'; // Replace with your actual collection ID

export async function fetchServices(): Promise<Service[]> {
    try {
        const response = await databases.listDocuments(databaseId, serviceCollectionId);
        return response.documents as unknown as Service[];
    } catch (error) {
        console.error('Error fetching Services:', error);
        throw error;
    }
}

export async function createService(service: Service): Promise<Service> {
    try {
        const response = await databases.createDocument(databaseId, serviceCollectionId, service.id, service);
        return response as unknown as Service;
    } catch (error) {
        console.error('Error creating Service:', error);
        throw error;
    }
}

export async function fetchServiceById(serviceId: string, testMode = false): Promise<Service> {
    try {
        const response = await databases.getDocument(databaseId, serviceCollectionId, serviceId); // Updated to use existing constants
        return response as unknown as Service; // Ensure the response is typed correctly
    } catch (error) {
        console.error('Error fetching service:', error);
        throw error;
    }
}