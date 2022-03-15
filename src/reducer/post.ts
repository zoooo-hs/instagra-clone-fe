import { Post } from "../model";

const initialPosts: Post[] = [];

const FETCH = "POST/FETCH";

export const didFetch = (posts: Post[]) => {
    return {
        type: FETCH,
        posts
    }
}

export const posts = (state = initialPosts, action: {type: string, posts: Post[]}) => {
    switch (action.type) {
        case FETCH:
            return {
                ...action.posts
            };
        default:
            return state;
    }
}