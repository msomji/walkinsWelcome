import {  FetchRoomsByHostId, FETCH_ALL_ROOMS, fetchRoomsAllRoomsSuccess, fetchRoomsAllRoomsFailed } from "../../store/room/RoomActions";
import {  fetchRooms } from "../../Services/RoomService";
import { put, takeLatest } from "redux-saga/effects";

function* workerSaga(action: FetchRoomsByHostId) {
    try {
        const rooms = yield fetchRooms()
        yield put(fetchRoomsAllRoomsSuccess(rooms))
    } catch(e) {
        yield put(fetchRoomsAllRoomsFailed(e))
    }
}

export function* fetchAllRooms() {
    yield takeLatest(FETCH_ALL_ROOMS, workerSaga)
}