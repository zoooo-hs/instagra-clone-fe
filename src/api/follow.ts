import axios from "axios";
import {Follow, User} from "../model";

export async function follow(id: number): Promise<Follow> {
    return axios.post(`/user/${id}/follow`).then(result => result.data);
}

export async function unfollow(id: number): Promise<number> {
    return axios.delete(`/user/${id}/follow`).then(result => result.data);
}

export async function findByUserId(id: number): Promise<User[]> {
    return axios.get(`/user/${id}/follow/follow-user`).then(result => result.data);
}

export async function findByFollowUserId(id: number): Promise<User[]> {
    return axios.get(`/follow-user/${id}/follow/user`).then(result => result.data);
}
