import { openDatabase } from 'react-native-sqlite-storage';
export const cacheDbConnect = async () => {
    const db = openDatabase(
        {
            name: 'store.db',
            location: 'default',
        },
        () => { },
        error => {
            console.log('Error opening database: ', error);
        }
    )
    return db
};