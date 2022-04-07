import axios from "axios";
import {Follow} from "../model";

export async function follow(id: number): Promise<Follow> {
    return axios.post(`/user/${id}/follow`).then(result => result.data);
}

export async function unfollow(id: number): Promise<number> {
    return axios.delete(`/user/${id}/follow`).then(result => result.data);
}
