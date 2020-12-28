import {  FETCH_ROOMS_BY_HOST_ID, FetchRoomsByHostId } from "../../store/room/RoomActions";
import { takeLatest } from "redux-saga/effects";

function* workerSaga(action: FetchRoomsByHostId) {
    // try {
    //     const rooms = yield fetchRoomByHostId(action.payload)
    //     yield put(fetchRoomsByHostIdSuccess(rooms))
    // } catch(e) {
    //     yield put(fetchRoomsByHostIdFailed(e))
    // }
}

export function* fetchRoomByHostIdSaga() {
    yield takeLatest(FETCH_ROOMS_BY_HOST_ID, workerSaga)
}