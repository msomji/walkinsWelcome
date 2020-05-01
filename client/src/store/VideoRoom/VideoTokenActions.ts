
export const CLEAR_VIDEO_TOKEN = "CLEAR_VIDEO_TOKEN";
export const GET_VIDEO_TOKEN = "GET_VIDEO_TOKEN";
export const GET_VIDEO_TOKEN_SUCCESS = "GET_VIDEO_TOKEN_SUCCESS";
export const GET_VIDEO_TOKEN_FAILURE = "GET_VIDEO_TOKEN_FAILURE";


export interface GetVideoTokenPayLoad{
    roomId: string,
    hostName: string,
}

export interface GetVideoToken {
    payload: GetVideoTokenPayLoad,
    type: typeof GET_VIDEO_TOKEN
}
export interface GetVideoTokenSuccess {
    payload: string,
    type: typeof GET_VIDEO_TOKEN_SUCCESS
}
export interface GetVideoTokenFailed {
    payload: string,
    type: typeof GET_VIDEO_TOKEN_FAILURE
}
export interface ClearVideoToken {
    type: typeof CLEAR_VIDEO_TOKEN
}

export const clearVideoToken = (): ClearVideoToken => ({type: CLEAR_VIDEO_TOKEN})
export const getVideoToken = (payload: GetVideoTokenPayLoad): GetVideoToken => ({type: GET_VIDEO_TOKEN, payload})
export const getVideoTokenSuccess = (token: string): GetVideoTokenSuccess => ({type: GET_VIDEO_TOKEN_SUCCESS, payload: token})
export const getVideoTokenFailed = (e: string): GetVideoTokenFailed => ({type: GET_VIDEO_TOKEN_FAILURE, payload:e})



export type VideoTokenActions = GetVideoToken
    | GetVideoTokenFailed
    |GetVideoTokenSuccess
    |ClearVideoToken;