import { put, takeLatest } from "redux-saga/effects";
import {DELETE_PATIENT, DeletePatient, deletePatientSuccess, deletePatientFailed } from "../../store/Patient/PatientActions";
import { deletePatient } from "../../Services/PatientService";

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