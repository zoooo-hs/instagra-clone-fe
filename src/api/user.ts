import axios from "axios";
import { User } from "../model";

export function info(id: number):Promise<User> {
    return axios.get(`/user/${id}`).then(result => result.data);
}

export function infoByName(name: string): Promise<User> {
    return axios.get(`/name/${name}/user`).then(result => result.data);
}
