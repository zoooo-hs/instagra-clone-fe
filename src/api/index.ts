import axios from "axios";
import {NavigateFunction} from "react-router-dom";
import {Dispatch} from "redux";
import {path as signInPath} from "../component/auth/sign-in";
import {Error} from "../model";
import {didSignIn} from "../reducer/auth";
import {set} from "../reducer/error";
import {refresh} from "./auth";


const developmentBackendURL = () => {
    const {protocol, hostname} = window.location;
    return `${protocol}//${hostname}:8080`;
}


export function setAxios(dispatch: Dispatch, navigate: NavigateFunction) {
    axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? developmentBackendURL() : process.env.REACT_APP_API_URL;

    axios.interceptors.response.use(response => response, async (error) => {

        if (error.response.status === 403) {
            try {
                const user = await refresh();
                dispatch(didSignIn(user));
            } catch {
                navigate(signInPath);
                return;
            }
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${window.sessionStorage.getItem('at')}`;
            window.sessionStorage.removeItem('at');
            return axios(originalRequest);
        } else if (error.response.status === 401 && error.response.data.code === "TOKEN_EXPIRED") {
            navigate(signInPath);
        } else {
            dispatch(set((error.response.data as Error)))
        }


        return Promise.reject(error);
    });

}

