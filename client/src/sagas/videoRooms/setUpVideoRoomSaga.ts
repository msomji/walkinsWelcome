import { put, takeLatest } from "redux-saga/effects";
import { GET_VIDEO_TOKEN, GetVideoToken, getVideoTokenFailed, getVideoTokenSuccess } from "../../store/VideoRoom/VideoTokenActions";
import { getVideoAuthToken, getVideoAuthTokenForPatient } from "../../Services/VideoServices";
import { deletePatient } from "../../store/Patient/PatientActions";


function* workerSaga(action: GetVideoToken) {

    try {
        let patient = yield getVideoAuthTokenForPatient(action.payload.roomId)
        const videoToken = yield getVideoAuthToken(action.payload.roomId, action.payload.hostName.replace(" ", ""))
        yield put(getVideoTokenSuccess(videoToken.token))
        yield put(deletePatient(patient._id!))
    } catch (e) {
        yield put(getVideoTokenFailed(e))
    }
}

export function* setUpVideoRoomSaga() {
    yield takeLatest(GET_VIDEO_TOKEN, workerSaga)
}