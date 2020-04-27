import { CreateRoom, createRoomSuccess, createRoomFailed, CREATE_ROOM } from "../../store/room/RoomActions";
import { createRoom } from "../../Services/RoomService";
import { put, takeLatest } from "redux-saga/effects";

function* workerSaga(action: CreateRoom) {
    try {
        const roomId = yield createRoom(action.payload)
        yield put(createRoomSuccess(action.payload))
    } catch(e) {
        yield put(createRoomFailed(e))
    }
}

export function* createRoomSaga() {
    yield takeLatest(CREATE_ROOM, workerSaga)
}