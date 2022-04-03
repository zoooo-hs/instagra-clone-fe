import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { Post } from "../model";

export type PostListType = "ALL" | "USER" | "HASH_TAG";

const encodedHashTag = encodeURI("#");

export const fetch = async (type: PostListType, keyword: string, index: number, size: number): Promise<Post[]> => {
    switch (type) {
        case "USER":
            return axios.get(`/name/${keyword}/user/post`,
                {
                    params: {
                        index,
                        size
                    }
                }).then((result) => Promise.resolve(result.data))
                .catch((e: AxiosError) => {
                    if (e.response?.status === 403) {
                        return Promise.reject("AUTH");
                    }
                    return Promise.resolve([]);
                });
        case "HASH_TAG":
            keyword = encodedHashTag + keyword
            return axios.get("/post",
                {
                    params: {
                        keyword,
                        searchKey: "HASH_TAG",
                        index,
                        size
                    }
                }).then((result) => Promise.resolve(result.data))
                .catch((e: AxiosError) => {
                    if (e.response?.status === 403) {
                        return Promise.reject("AUTH");
                    }
                    return Promise.resolve([]);
                });
        case "ALL":
        default:
            return axios.get("/post",
                {
                    params: {
                        index,
                        size
                    }
                }).then((result) => Promise.resolve(result.data))
                .catch((e: AxiosError) => {
                    if (e.response?.status === 403) {
                        return Promise.reject("AUTH");
                    }
                    return Promise.resolve([]);
                });
    }

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
