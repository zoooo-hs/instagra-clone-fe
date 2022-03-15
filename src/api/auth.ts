import axios from "axios";
import jwtDecode from "jwt-decode";
import { User } from "../model";

interface JWT {
    access_token: string;
    refresh_token: string;
}

export const signIn = (email: string, password: string): Promise<User> => {
    return axios.post("http://localhost:8080/auth/sign-in", {email, password}).then((result) => {
        let jwt: JWT  = result.data;
        const user: User = jwtDecode<User>(jwt.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.access_token}`;
        window.sessionStorage.setItem('rt', jwt.refresh_token);
        return Promise.resolve(user);
    }).catch((e) => {
        return Promise.reject(null);
    });
}

export const signUp = (email: string, name: string, password: string): Promise<String> => {
    return axios.post("http://localhost:8080/auth/sign-up", {email, name, password}).then((result) => {
        return Promise.resolve(result.data);
    }).catch((e) => {
        return Promise.reject("ERROR");
    });
}

export const signOut = () => {
    window.sessionStorage.removeItem('rt');
    axios.defaults.headers.common['Authorization'] = '';
}

export const emailDuplicationCheck = (email: string): Promise<boolean> => {
    return axios.get("http://localhost:8080/auth/email", {
        params: {
            "keyword": email
        }
    }).then((result) => {
        return Promise.resolve(result.data);
    }).catch((e) => {
        return Promise.reject("ERROR");
    });
}

export const nameDuplicationCheck = (name: string): Promise<boolean> => {
    return axios.get("http://localhost:8080/auth/name", {
        params: {
            "keyword": name
        }
    }).then((result) => {
        return Promise.resolve(result.data);
    }).catch((e) => {
        return Promise.reject("ERROR");
    });
}

export const refresh = (): Promise<User> => {
    const rt = window.sessionStorage.getItem('rt');
    if (rt === null) {
        return Promise.reject(null);
    }
    return axios.post("http://localhost:8080/auth/refresh", {access_token: rt, refresh_token: rt}).then((result) => {
        let jwt: JWT  = result.data;
        const user: User = jwtDecode<User>(jwt.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt.access_token}`;
        window.sessionStorage.setItem('rt', jwt.refresh_token);
        return Promise.resolve(user);
    }).catch((e) => {
        return Promise.reject(null);
    });
}