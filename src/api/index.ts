import axios from "axios";
import {Dispatch} from "redux";
import {Error} from "../model";
import {set} from "../reducer/error";

const developmentBackendURL = () => {
    const {protocol, hostname} = window.location;
    return `${protocol}//${hostname}:8080`;
}


export const setAxios = (dispatch: Dispatch) => {
    axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? developmentBackendURL() : process.env.REACT_APP_API_URL;

    axios.interceptors.response.use(response => response, (error) => {
        dispatch(set((error.response.data as Error)))
    });
}

