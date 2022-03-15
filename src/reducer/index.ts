import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from "./post";

const rootReducer = combineReducers({
    auth,
    posts
})
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>