import {Action} from ".";
import {User} from "../model";

export interface AuthState {
    user: User,
    isAthenticated: boolean
}

type AuthAction = Action<AuthState>;

const initialState: AuthState = {
    user: {email: "", name: "", id: -1, bio: "", photo: {id: -1, path: ""}, following: false, follower_count: 0, following_count: 0},
    isAthenticated: false
}

const DID_SIGN_IN = "AUTH/DID_SIGN_IN";
const SIGN_OUT = "AUTH/SIGN_OUT";


export const didSignIn = (user: User): AuthAction => {
    return {
        type: DID_SIGN_IN,
        state: {
            user: user,
            isAthenticated: true
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
        case SIGN_OUT:
            return {
                ...state, ...action.state
            };
        default:
            return state;
    }
}
