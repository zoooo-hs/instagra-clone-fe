import axios from "axios";
import { User } from "../model";

export function info(id: number):Promise<User> {
    return axios.get(`/user/${id}`).then(result => result.data);
}