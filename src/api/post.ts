import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { Post } from "../model";

export const fetch = (index: number): Promise<Post[]> => {
    return axios.get("/post",
        {
            params: {
                index,
                size: 4
            }
        }).then((result) => Promise.resolve(result.data))
        .catch((e: AxiosError) => {
            if (e.response?.status === 403) {
                return Promise.reject("AUTH");
            }
            return Promise.resolve([]);
        });
}


export const post = (formData: {description: string, files: File[]}): Promise<Post> => {
    const {description, files} = formData;
    let fd = new FormData();
    fd.append("description", description);
    for (let i = 0; i < files.length; i++) {
        fd.append("files", files[i]);
    }
    return axios.post("/post", fd, {
        "headers": {
            "Content-Type": "multipart/form-data"
        }
    }).then(result => result.data);
}