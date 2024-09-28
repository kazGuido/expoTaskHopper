// src/lib/services/userService.ts

import { functions } from '../appwrite'
import { User } from '../models/User';

export async function fetchTaskers(): Promise<User[]> {
  try {
    const functionId = '66eeeeec0039b9ed2de6'; // Replace with your actual function ID
    const functionBody = ''; // Not needed in this case

    const promise = functions.createExecution(functionId, functionBody);
    
    const response = await promise;
    // The response is a JSON string; parse it
    const data = JSON.parse(response); // Corrected to directly parse the response

    if (data.success) {
      return data.data as User[];
    } else {
      console.error('Error fetching taskers:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Error calling fetchTaskers function:', error);
    return [];
  }
}