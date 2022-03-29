import axios, { AxiosError } from "axios";
import { HashTag, User } from "../model";

export type SearchType = "NAME" | "HASH_TAG";

export function hashTagSearch(keyword: string, searchKey: SearchType): Promise<HashTag[]> {
    return axios.get("/hash-tag", {
        params: {
            keyword,
            searchKey,
            index: 0,
            size: 20
        }
    }).then(result => result.data)
    .catch((e: AxiosError) => {
        if (e.response?.status === 403) {
            return Promise.reject("AUTH");
        }
        return Promise.resolve([]);
    });
}

export function userSearch(keyword: string, searchKey: SearchType): Promise<User[]> {
    return axios.get("/user", {
        params: {
            keyword,
            searchKey,
            index: 0,
            size: 20
        }
    }).then(result => result.data)
    .catch((e: AxiosError) => {
        if (e.response?.status === 403) {
            return Promise.reject("AUTH");
        }
        return Promise.resolve([]);
    });
}