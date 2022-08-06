import axios from "axios";

const DB_URL =
    "https://repair-dock-default-rtdb.europe-west1.firebasedatabase.app";

// CREATE
export const createDevice = async (deviceData) => {
    const response = await axios.post(DB_URL + "/devices.json", deviceData);
    let deviceId = response.data.name;
    return deviceId;
};
export const createUser = async (userData) => {
    const response = await axios.post(DB_URL + "/users.json", userData);
    let userId = response.data.name;
    return userId;
};
export const createTicket = async (ticketData) => {
    const response = await axios.post(DB_URL + "/tickets.json", ticketData);
};

export const createEntry = async (location, itemData) => {
    const response = await axios.post(DB_URL + `/${location}.json`, itemData);
    let createdItemID = response.data.name;
    return createdItemID;
};

//READ
export const fetchDevices = async () => {
    const response = await axios.get(DB_URL + "/devices.json");
    let fetchedData = [];

    for (let key in response.data) {
        let deviceObj = {
            id: key,
            data: response.data[key],
        };

        fetchedData.push(deviceObj);
    }

    return fetchedData;
};

export const fetchDataTable = async (location) => {
    const response = await axios.get(DB_URL + `/${location}.json`);
    let fetchedData = [];

    for (let key in response.data) {
        let resultItem = {
            id: key,
            data: response.data[key],
        };

        fetchedData.push(resultItem);
    }
    return fetchedData;
};

export const fetchDataWithID = async (id, location) => {
    const response = await axios.get(DB_URL + `/${location}/${id}.json`);
    let fetchedData = { id: response.data.id, data: response.data };

    return fetchedData;
};

//DELETE
export const deleteItem = async (id, location) => {
    const response = await axios.delete(DB_URL + `/${location}/${id}.json`);
    return response;
};
