import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig = {
    name: 'MyDb',
    version: 1,
    objectStoresMeta: [
        {
            store: 'people',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'email', keypath: 'email', options: { unique: false } }
            ]
        }
    ]
};