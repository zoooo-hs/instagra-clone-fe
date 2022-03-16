import { Action } from ".";
import { User } from "../model";

export interface AuthState {
    user: User,
    isAthendticated: boolean
}

type AuthAction = Action<AuthState>;

const initialState: AuthState = {
    user: {email: "", name: "", id: -1, bio:"", photo: {id:-1, path:""}},
    isAthendticated: false
}

const DID_SIGN_IN = "AUTH/DID_SIGN_IN";
const SIGN_OUT = "AUTH/SIGN_OUT";


export const didSignIn = (user: User): AuthAction => {
    return {
        type: DID_SIGN_IN,
        state: {
            user: user,
            isAthendticated: true
        }
    }
}

export const didSignOut = () => {
    return {
        type: SIGN_OUT,
        state: initialState
    }
}

export const auth = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case DID_SIGN_IN:
            return {
                ...state, ...action.state
            };
        case SIGN_OUT:
        default:
            return state;
    }
}