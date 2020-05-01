import { GET_VIDEO_TOKEN_SUCCESS, VideoTokenActions, CLEAR_VIDEO_TOKEN } from "./VideoTokenActions"

export interface TokenState {
    token: string,
    tokenLoaded: boolean
}

const initialState: TokenState ={
    token: '',
    tokenLoaded: false
}


export const TokeReducer = (state=initialState, action: VideoTokenActions  ) => {

    switch(action.type) {
        case GET_VIDEO_TOKEN_SUCCESS : {
            return {
                tokenLoaded: true,
                token: action.payload
            }
        }
        case CLEAR_VIDEO_TOKEN : {
            return {...initialState}
        }
        default: return  {...state}
    }

}