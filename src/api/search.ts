import axios from "axios";
import {HashTag, User} from "../model";

export type SearchType = "NAME" | "HASH_TAG";

export async function hashTagSearch(keyword: string, searchKey: SearchType): Promise<HashTag[]> {
    return axios.get("/hash-tag", {
        params: {
            keyword,
            searchKey,
            index: 0,
            size: 20
        }
    }).then(result => result.data)
        .catch(_ => {
            return Promise.resolve([]);
        });
}

export async function userSearch(keyword: string, searchKey: SearchType): Promise<User[]> {
    return axios.get("/user", {
        params: {
            keyword,
            searchKey,
            index: 0,
            size: 20
        }
    }).then(result => result.data)
        .catch(_ => {
            return Promise.resolve([]);
        });
}
