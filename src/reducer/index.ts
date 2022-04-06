import {combineReducers, createStore} from "redux";
import {auth} from "./auth";
import {error} from "./error";


export interface Action<T> {
    state: T,
    type: string
}

const rootReducer = combineReducers({
    auth,
    error
})
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);
