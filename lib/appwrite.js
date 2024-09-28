import { Client, Account, Databases, Functions, Teams } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66dc14c200385e33dfe5');

export const account = new Account(client);
const databases = new Databases(client);

const databaseId = '66ddb5580015eff0d4f0';

export async function fetchTaskApplications() {
  try {
    const response = await databases.listDocuments(databaseId, '66ddb8b1002dbd636de9');
    return response.documents;
  } catch (error) {
    console.error('Error fetching TaskApplications:', error);
    throw error;
  }
}

export async function fetchServices() {
  try {
    const response = await databases.listDocuments(databaseId, '66ddb7d7003133b27ce0');
    return response.documents;
  } catch (error) {
    console.error('Error fetching Services:', error);
    throw error;
  }
}

export async function fetchMessages() {
  try {
    const response = await databases.listDocuments(databaseId, '66ddb6b70006f80fd756');
    return response.documents;
  } catch (error) {
    console.error('Error fetching Messages:', error);
    throw error;
  }
}

export async function fetchReviews() {
  try {
    const response = await databases.listDocuments(databaseId, '66ddb640001ca822a88c');
    return response.documents;
  } catch (error) {
    console.error('Error fetching Reviews:', error);
    throw error;
  }
}

export async function fetchTasks() {
  try {
    const response = await databases.listDocuments(databaseId, '66ddb56a001913029963');
    return response.documents;
  } catch (error) {
    console.error('Error fetching Tasks:', error);
    throw error;
  }
}

const teams = new Teams(client);
const functions = new Functions(client);

export { client, teams, databases, functions };