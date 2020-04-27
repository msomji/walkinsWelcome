import { UserActions, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "./UserActions"

export interface UserObject {
    name: string;
    imageUrl: string;
    email: string;
    googleId: string;
}

export interface UserState {
    isLoggedIn: boolean;
    user?: UserObject
}

const initialState: UserState = {
    isLoggedIn: false

}

export const UserReducer = (state= initialState, action: UserActions) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS : {
            return {
                ...state,
                user: {...action.payload},
                isLoggedIn: true,
            }
        }
        case USER_LOGOUT_SUCCESS : {
            return {
                ...initialState,
            }
        }
        default: return {...state}
    }
}