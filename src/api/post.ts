import axios, { AxiosError } from "axios";
import { Post } from "../model";

export const fetch = (): Promise<Post[]> => {
    return axios.get("http://localhost:8080/post",
        {
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
}
