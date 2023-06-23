import * as SecureStore from 'expo-secure-store';

export  class StorageManager {
    static async saveObject(key: string, object: any): Promise<void> {
        try {
            const serializedObject = JSON.stringify(object);
            await SecureStore.setItemAsync(key, serializedObject);
        } catch (error) {
            console.error('Błąd podczas zapisywania obiektu:', error);
        }
    }

    static async getObject(key: string): Promise<any | null> {
        try {
            const serializedObject = await SecureStore.getItemAsync(key);
            if (serializedObject) {
                const object = JSON.parse(serializedObject);
                return object;
            }
            return null;
        } catch (error) {
            console.error('Błąd podczas odczytywania obiektu:', error);
            return null;
        }
    }
}