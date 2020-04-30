import { DELETE_ROOM, DeleteRoom, deleteRoomSuccess, deleteRoomFailed } from "../../store/room/RoomActions";
import { deleteRoom } from "../../Services/RoomService";
import { put, takeLatest } from "redux-saga/effects";

function* workerSaga(action: DeleteRoom) {
    try {
        yield deleteRoom(action.payload)
        yield put(deleteRoomSuccess(action.payload))
    } catch(e) {
        yield put(deleteRoomFailed(e))
    }
}

export function* deleteRoomSaga() {
    yield takeLatest(DELETE_ROOM, workerSaga)
}