import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { User } from "../model";

interface JWT {
    access_token: string;
    refresh_token: string;
}

export const signIn = (email: string, password: string): Promise<User> => {
    return axios.post("http://localhost:8080/auth/sign-in", {email, password}).then((result) => {
        let jwt: JWT  = result.data;
        const user: User = jwtDecode<User>(jwt.access_token);
        user.email = jwtDecode<JwtPayload>(jwt.access_token).sub!;
        return Promise.resolve(user);
    }).catch((e) => {
        return Promise.reject(null);
    });
}