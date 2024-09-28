import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66dc14c200385e33dfe5');

export const account = new Account(client);
export const databases = new Databases(client);

export const databaseId = '66ddb5580015eff0d4f0';
export const taskCollectionId = '66ddb56a001913029963';

export { ID };