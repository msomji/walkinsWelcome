import { UserLoginSuccess, USER_LOGIN_SUCCESS } from "../../store/user/UserActions";
import { takeLatest } from "redux-saga/effects";

function* workerSaga(action: UserLoginSuccess) {
        // yield put(fetchRoomsByHostId(action.payload.googleId))
}


export function* fetchRoomsByHostIdSaga() {
    yield takeLatest(USER_LOGIN_SUCCESS, workerSaga)
}