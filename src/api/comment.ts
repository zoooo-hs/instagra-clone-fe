import axios, { AxiosError } from "axios";
import { CommentType } from "../component/comment";
import { Comment } from "../model";


export const fetch = (id: number, type: CommentType, index: number): Promise<Comment[]> => {
    switch (type) {
        case "PostComment":
            return axios.get(`/post/${id}/comment`, {
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
        case "CommentComment":
            return axios.get(`/comment/${id}/comment`, {
                params: {
                    index: 0,
                    size: 20
                }
            }).then((result) => Promise.resolve(result.data))
            .catch((e: AxiosError) => {
                if (e.response?.status === 403) {
                    return Promise.reject("AUTH");
                }
                return Promise.resolve([]);
            });
        default:
            return Promise.reject("");
    }
}

export const post = (id: number, content: string, type: CommentType): Promise<Comment> =>  {
    switch (type) {
        case "PostComment":
            return axios.post(`/post/${id}/comment`, {
                content
            }).then(result => result.data);
        case "CommentComment":
            return axios.post(`/comment/${id}/comment`, {
                content
            }).then(result => result.data);
        default:
            return Promise.reject();
    }
}

export const deleteById = (id: number):Promise<void> => {
    return axios.delete(`/comment/${id}`);
}

export const patch = (id: number, content: string):Promise<Comment> => {
    return axios.patch(`/comment/${id}`, {
        content
    }).then(result => result.data);
}