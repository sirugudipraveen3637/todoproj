import { Appwrite } from 'appwrite';

const appwrite = new Appwrite();

appwrite
    .setEndpoint('http://localhost/v1')
    .setProject('638a8eee793a97ce9b15');

export const account=appwrite.account;