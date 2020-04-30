import { UserLoginSuccess, USER_LOGIN_SUCCESS } from "../../store/user/UserActions";
import { takeLatest, put } from "redux-saga/effects";
import { fetchRoomsByHostId } from "../../store/room/RoomActions";

function* workerSaga(action: UserLoginSuccess) {
        // yield put(fetchRoomsByHostId(action.payload.googleId))
}


export function* fetchRoomsByHostIdSaga() {
    yield takeLatest(USER_LOGIN_SUCCESS, workerSaga)
}