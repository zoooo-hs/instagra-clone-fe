import axios from "axios";
import {Photo, User} from "../model";

export async function info(id: number): Promise<User> {
    return axios.get(`/user/${id}`).then(result => result.data);
}

export async function infoByName(name: string): Promise<User> {
    return axios.get(`/name/${name}/user`).then(result => result.data)
        .catch(_ => Promise.resolve(undefined));
}

export async function updateBio(user: User): Promise<User> {
    return axios.patch(`/user/${user.id}/bio`, user).then(result => result.data);
}

export async function updateProfilePhoto(user: User, photoFile: File): Promise<Photo> {
    let fd = new FormData();
    fd.append("photo", photoFile);
    return axios.post(`/user/${user.id}/photo`, fd, {
        "headers": {
            "Content-Type": "multipart/form-data"
        }
    }).then(result => result.data);
}
