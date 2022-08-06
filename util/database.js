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

//READ
export const fetchDevices = async () => {
    const response = await axios.get(DB_URL + "/devices.json");
    let fetchedData = [];

    for (let key in response.data) {
        let deviceObj = {
            id: key,
            make: response.data[key].make,
            model: response.data[key].model,
            type: response.data[key].type,
        };

        fetchedData.push(deviceObj);
    }
    return fetchedData;
};
