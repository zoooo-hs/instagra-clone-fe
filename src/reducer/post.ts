import { Post } from "../model";

export interface PostListState {
    isFetched: boolean,
    posts: Post[]
}

const initialPosts: PostListState = {isFetched: false, posts: []};

const FETCH = "POST/FETCH";

export const didFetchPost = (posts: Post[]) => {
    return {
        type: FETCH,
        postList: {
            isFetched: true,
            posts
        }
    }
}

export const posts = (state = initialPosts, action: {type: string, postList: PostListState}) => {
    switch (action.type) {
        case FETCH:
            return {
                ...action.postList
            };
        default:
            return state;
    }
}