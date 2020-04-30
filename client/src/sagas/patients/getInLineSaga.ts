import { put, takeLatest } from "redux-saga/effects";
import { GET_IN_LINE, GetInLine, getInLineSuccess, getInLineFailed } from "../../store/Patient/PatientActions";
import { createPatient } from "../../Services/PatientService";

function* workerSaga(action: GetInLine) {
    try {
        yield createPatient(action.payload)
        yield put(getInLineSuccess())
    } catch(e) {
        yield put(getInLineFailed(e))
    }
}

export function* getInLineSaga() {
    yield takeLatest(GET_IN_LINE, workerSaga)
}