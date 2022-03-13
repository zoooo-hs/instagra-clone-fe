import { User } from "../model";

const initialUser = {email: "", name: "", id: -1, bio:"", photo: {id:-1, path:""}};

const DID_SIGN_IN = "AUTH/DID_SIGN_IN";
const SIGN_OUT = "AUTH/SIGN_OUT";


export const didSignIn = (user: User) => {
    return {
        type: DID_SIGN_IN,
        user
    }
}

export const signOut = () => {
    return {
        type: DID_SIGN_IN,
        initialUser
    }
}

export const auth = (state = initialUser, action: {type: string, user: User}) => {
    switch (action.type) {
        case DID_SIGN_IN:
            return {
                ...action.user
            };
        case SIGN_OUT:
            return {
                ...action.user
            };
        default:
            return state;
    }
}