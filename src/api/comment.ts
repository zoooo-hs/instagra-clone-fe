import axios from "axios";
import {CommentType} from "../component/comment";
import {Comment} from "../model";


export async function fetch(id: number, type: CommentType, index: number): Promise<Comment[]> {
    switch (type) {
        case "PostComment":
            return axios.get(`/post/${id}/comment`, {
                params: {
                    index,
                    size: 4
                }
            }).then(result => result.data)
                .catch(_ => {
                    return Promise.resolve([]);
                });
        case "CommentComment":
            return axios.get(`/comment/${id}/comment`, {
                params: {
                    index: 0,
                    size: 20
                }
            }).then((result) => Promise.resolve(result.data))
                .catch(_ => {
                    return Promise.resolve([]);
                });
        default:
            return Promise.reject("");
    }
}

export async function post(id: number, content: string, type: CommentType): Promise<Comment> {
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

export async function deleteById(id: number): Promise<void> {
    return axios.delete(`/comment/${id}`);
}

export async function patch(id: number, content: string): Promise<Comment> {
    return axios.patch(`/comment/${id}`, {
        content
    }).then(result => result.data);
}
