import { put, takeLatest } from "redux-saga/effects";
import { GET_IN_LINE, GetInLine, getInLineSuccess, getInLineFailed, DELETE_PATIENT, PatientActions, DeletePatient, deletePatientSuccess, deletePatientFailed } from "../../store/Patient/PatientActions";
import { createPatient, deletePatient } from "../../Services/PatientService";

function* workerSaga(action: DeletePatient) {
    try {
        yield deletePatient(action.payload)
        yield put(deletePatientSuccess())
    } catch(e) {
        yield put(deletePatientFailed(e))
    }
}

export function* deletePatientSaga() {
    yield takeLatest(DELETE_PATIENT, workerSaga)
}