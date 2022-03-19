import axios from "axios";
import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import { User } from "../model";
import { didSignIn, didSignOut } from "../reducer/auth";

interface JWT {
    access_token: string;
    refresh_token: string;
}

export const signIn = (dispatch: Dispatch<any>, email: string, password: string) => {
    return axios.post("/auth/sign-in", {email, password}).then((result) => {
        let jwt: JWT  = result.data;
        const user: User = jwtDecode<User>(jwt.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.access_token}`;
        window.sessionStorage.setItem('rt', jwt.refresh_token);

        dispatch(didSignIn(user));
    });
}

export const signUp = (email: string, name: string, password: string): Promise<String> => {
    return axios.post("/auth/sign-up", {email, name, password});
}

export const signOut = (dispatch: Dispatch<any>) => {
    window.sessionStorage.removeItem('rt');
    delete axios.defaults.headers.common['Authorization']

    dispatch(didSignOut());
}

export const checkEmailDuplication = (email: string): Promise<boolean> => {
    return axios.get("/auth/email", {
        params: {
            "keyword": email
        }
    }).then((result) => result.data);
}

export const checkNameDuplication = (name: string): Promise<boolean> => {
    return axios.get("/auth/name", {
        params: {
            "keyword": name
        }
    }).then((result) => result.data);
}

export const refresh = (): Promise<User> => {
    const rt = window.sessionStorage.getItem('rt');
    if (rt === null) {
        return Promise.reject(null);
    }
    return axios.post("/auth/refresh", {access_token: rt, refresh_token: rt}).then((result) => {
        let jwt: JWT  = result.data;
        const user: User = jwtDecode<User>(jwt.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.access_token}`;
        window.sessionStorage.setItem('rt', jwt.refresh_token);
        return Promise.resolve(user);
    }).catch((e) => {
        return Promise.reject(null);
    });
}