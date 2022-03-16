import axios, { AxiosError } from "axios";
import { Comment } from "../model";


export const POST_COMMENT = "POST_COMMENT";
export const COMMENT_COMMENT = "COMMENT_COMMENT";

export const fetch = (id: number, type: string): Promise<Comment[]> => {
    switch (type) {
        case POST_COMMENT:
            return axios.get(`http://localhost:8080/post/${id}/comment`, {
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
        case COMMENT_COMMENT:
            return axios.get(`http://localhost:8080/comment/${id}/comment`, {
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