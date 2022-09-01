import axios from "axios";
import { API_KEY } from "./keys";

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    });

    let returnData = {
        token: response.data.idToken,
        userId: response.data.localId,
    };

    return returnData;
};

export let createUser = (email, password) => {
    return authenticate("signUp", email, password);
};

export let loginUser = (email, password) => {
    return authenticate("signInWithPassword", email, password);
};
