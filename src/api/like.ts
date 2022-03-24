import axios from "axios";
import { LikeType } from "../component/like";

export const likeIt = (id: number, type: LikeType): Promise<number> => {
    switch (type) {
        case "CommentLike":
            return axios.post(`/comment/${id}/like`).then(result => result.data.id); 
        case "PostLike":
            return axios.post(`/post/${id}/like`).then(result => result.data.id);; 
        default:
            return Promise.reject();
    }
}

export const likeCancle = (id: number): Promise<void> => {
    return axios.delete(`/like/${id}`);
}