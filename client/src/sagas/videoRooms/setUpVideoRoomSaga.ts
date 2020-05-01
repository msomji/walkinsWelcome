import { put, takeLatest } from "redux-saga/effects";
import { GET_VIDEO_TOKEN, GetVideoToken, getVideoTokenFailed, getVideoTokenSuccess } from "../../store/VideoRoom/VideoTokenActions";
import { getVideoAuthToken, getVideoAuthTokenForPatient } from "../../Services/VideoServices";

// import { put } from 'redux-saga/effects';

// function* login(action) {
//   // if login succeeds 
// }

function* workerSaga(action: GetVideoToken) {

    try {
        yield getVideoAuthTokenForPatient(action.payload.roomId)
        // dispatch call to make auth token for next patient 

        const videoToken = yield getVideoAuthToken(action.payload.roomId, action.payload.hostName.replace(" ", ""))
        
        yield put(getVideoTokenSuccess(videoToken.token))
    } catch (e) {
        yield put(getVideoTokenFailed(e))
    }
}

export function* setUpVideoRoomSaga() {
    yield takeLatest(GET_VIDEO_TOKEN, workerSaga)
}