import axios, { AxiosError } from "axios";
import { CommentType } from "../component/comment";
import { Comment } from "../model";


export const fetch = (id: number, type: CommentType): Promise<Comment[]> => {
    switch (type) {
        case "PostComment":
            return axios.get(`/post/${id}/comment`, {
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