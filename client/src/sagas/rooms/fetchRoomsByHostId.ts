import {  FETCH_ROOMS_BY_HOST_ID, FetchRoomsByHostId, fetchRoomsByHostIdSuccess, fetchRoomsByHostIdFailed } from "../../store/room/RoomActions";
import { fetchRoomByHostId } from "../../Services/RoomService";
import { put, takeLatest } from "redux-saga/effects";

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