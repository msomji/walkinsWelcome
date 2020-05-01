import { PatientActions } from "./PatientActions"


export interface Patient {
    _id?: string;
    name: string;
    phoneNumber: number;
    roomId: string;
    descriprion: string;
}
