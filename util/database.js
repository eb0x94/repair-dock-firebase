import axios from "axios";

import { DB_URL } from "./keys";

// CREATE

export const createEntry = async (location, itemData) => {
    const response = await axios.post(DB_URL + `/${location}.json`, itemData);
    let createdItemID = response.data.name;
    return createdItemID;
};

export const createDBUser = async (location, userId, itemData) => {
    const response = await axios.put(
        DB_URL + `/${location}/${userId}.json`,
        itemData
    );
    let createdItemID = response.data.name;
    return createdItemID;
};

//READ

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

export const fetchUserDevices = async (userId) => {
    const response = await axios.get(DB_URL + "/devices.json");
    let fetchedData = [];

    for (let key in response.data) {
        if (response.data[key].ownerId === userId) {
            let resultItem = {
                id: key,
                data: response.data[key],
            };
            fetchedData.push(resultItem);
        }
    }
    return fetchedData;
};


export const fetchShops = async () => {
    const response = await axios.get(DB_URL + "/users.json");
    let fetchedData = [];

    for (let key in response.data) {
        if (response.data[key].isAdmin) {
            let resultItem = {
                shopId: key,
                data: response.data[key],
            };
            fetchedData.push(resultItem);
        }
    }
    return fetchedData;
};

export const fetchUserTickets = async (id) => {
    const response = await axios.get(DB_URL + `/tickets.json`);
    let fetchedData = [];

    for (const key in response.data) {
        if (Object.hasOwnProperty.call(response.data, key)) {
            const element = response.data[key];
            if (element.users.userId === id || element.users.shopId === id) {
                let elementToAdd = {
                    id: key,
                    ticket: element,
                };
                fetchedData.push(elementToAdd);
            }
        }
    }

    return fetchedData;
};

export const fetchDataWithID = async (id, location) => {
    const response = await axios.get(DB_URL + `/${location}/${id}.json`);

    let fetchedData = response.data;

    return fetchedData;
};

//DELETE
export const deleteItem = async (id, location) => {
    const response = await axios.delete(DB_URL + `/${location}/${id}.json`);
    return response;
};

//UPDATE

export const updateItem = async (id, location, updateData) => {
    const response = await axios.put(
        DB_URL + `/${location}/${id}.json`,
        updateData
    );
    return response;
};
