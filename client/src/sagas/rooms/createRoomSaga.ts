import { CreateRoom, createRoomSuccess, createRoomFailed, CREATE_ROOM } from "../../store/room/RoomActions";
import { createRoom } from "../../Services/RoomService";
import { put, takeLatest } from "redux-saga/effects";

function* workerSaga(action: CreateRoom) {
    try {
        const roomIdPayLoad =yield createRoom(action.payload)
        console.log(roomIdPayLoad)
        const newRoom = {
            ...action.payload,
            _id: roomIdPayLoad
        }
        console.log(newRoom)
        yield put(createRoomSuccess(newRoom))
    } catch(e) {
        yield put(createRoomFailed(e))
    }
}

export function* createRoomSaga() {
    yield takeLatest(CREATE_ROOM, workerSaga)
}