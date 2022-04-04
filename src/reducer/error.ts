import {Action} from ".";
import {Error} from "../model";

export interface ErrorState {
    error?: Error,
}
const initialState:ErrorState = { error: undefined }

type ErrorAction = Action<ErrorState>;


const SET = "ERROR/SET";
const CLEAR = "ERROR/CELAR"


export const set = (error: Error): ErrorAction => {
    return {
        type: SET,
        state: {
            error: error
        }
    }
}

export const clear = () => {
    return {
        type: CLEAR,
        state: {
            error: undefined
        }
    }
}

export const error = (state = initialState, action: ErrorAction): ErrorState => {
    switch (action.type) {
        case SET:
        case CLEAR:
            return {
                ...state, ...action.state
            };
        default:
            return state;
    }
}
