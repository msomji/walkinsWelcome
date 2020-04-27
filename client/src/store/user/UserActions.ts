export const USER_LOGIN_STARTED = 'USER_LOGIN_STARED'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'


export interface UserObject {
    name: string;
    imageUrl: string;
    email: string;
    googleId: string;

}
export interface UserLogoutSuccess {
    type: typeof USER_LOGOUT_SUCCESS
}

export interface UserLoginFailed {
    type: typeof USER_LOGIN_FAILED,
    payload: string
}
export interface UserLoginSuccess {
    type: typeof USER_LOGIN_SUCCESS,
    payload: UserObject
}

export const userLoginSuccess = (payload: UserObject): UserLoginSuccess => ({ type: USER_LOGIN_SUCCESS, payload })
export const UserLoginFailed = (payload: string): UserLoginFailed => ({ type: USER_LOGIN_FAILED, payload })

export const userLogoutSuccess = (): UserLogoutSuccess => ({ type: USER_LOGOUT_SUCCESS })


export type UserActions =
            UserLoginSuccess
            | UserLogoutSuccess
            | UserLoginFailed;