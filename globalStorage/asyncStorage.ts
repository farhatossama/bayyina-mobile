import AsyncStorage from '@react-native-async-storage/async-storage';



const storeDataString = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
};
const storeDataObject = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
};
const getStringData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
};
const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch (e) {
        // error reading value
    }
};
export { storeDataString, storeDataObject, getObjectData, getStringData }