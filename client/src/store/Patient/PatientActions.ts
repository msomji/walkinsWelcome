import { Patient } from "./PatientReducer";

export const GET_IN_LINE = "GET_IN_LINE";
export const GET_IN_LINE_SUCCESS = "GET_IN_LINE_SUCCESS";
export const GET_IN_LINE_FAILED = "GET_IN_LINE_FAILED";

export const DELETE_PATIENT = "DELETE_PATIENT";
export const DELETE_PATIENT_SUCCESS = "DELETE_PATIENT_SUCCESS";
export const DELETE_PATIENT_FAILIED = "DELETE_PATIENT_FAILIED";

export interface GetInLine {
    payload: Patient,
    type: typeof GET_IN_LINE,
}
export interface GetInLineSuccess {
    type: typeof GET_IN_LINE_SUCCESS,
}
export interface GetInLineFailed {
    payload: string,
    type: typeof GET_IN_LINE_FAILED,
}

export interface DeletePatient {
    payload: string,
    type: typeof DELETE_PATIENT
}
export interface DeletePatientSuccess {
    type: typeof DELETE_PATIENT_SUCCESS
}
export interface DeletePatientFailed {
    payload: string,
    type: typeof DELETE_PATIENT_FAILIED
}

export const getInLine = (payload: Patient): GetInLine => ({ type: GET_IN_LINE, payload })
export const getInLineSuccess = (): GetInLineSuccess => ({ type: GET_IN_LINE_SUCCESS })
export const getInLineFailed = (payload: string): GetInLineFailed => ({ type: GET_IN_LINE_FAILED, payload })


export const deletePatient = (patientId: string): DeletePatient => ({ type: DELETE_PATIENT, payload: patientId })
export const deletePatientSuccess = (): DeletePatientSuccess => ({ type: DELETE_PATIENT_SUCCESS })
export const deletePatientFailed = (error: string): DeletePatientFailed => ({ type: DELETE_PATIENT_FAILIED, payload: error })



export type PatientActions =
    GetInLine
    | GetInLineSuccess
    | GetInLineFailed
    | DeletePatient
    | DeletePatientFailed
    | DeletePatientSuccess;
