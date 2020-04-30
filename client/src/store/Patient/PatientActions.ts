import { Patient } from "./PatientReducer";

export const GET_IN_LINE = "GET_IN_LINE";
export const GET_IN_LINE_SUCCESS = "GET_IN_LINE_SUCCESS";
export const GET_IN_LINE_FAILED = "GET_IN_LINE_FAILED";

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

export const getInLine = (payload: Patient): GetInLine => ({type: GET_IN_LINE, payload})
export const getInLineSuccess = (): GetInLineSuccess => ({type: GET_IN_LINE_SUCCESS})
export const getInLineFailed = (payload: string): GetInLineFailed => ({type: GET_IN_LINE_FAILED, payload})


export type PatientActions = 
    GetInLine
    | GetInLineSuccess
    | GetInLineFailed;
