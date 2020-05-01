import axios, { AxiosResponse } from 'axios';
import { Patient } from '../store/Patient/PatientReducer';


export async function createPatient(patient: Patient): Promise<string> {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/patients`, patient)
    .then((response: AxiosResponse) => response.data.id)
}


export async function deletePatient(patientId: string): Promise<string> {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/patients/${patientId}` )
    .then((response: AxiosResponse) => response.data)
}


export async function getNumOfPatientsByRoomId(roomId: string): Promise<string> {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/rooms/numPatients/${roomId}` )
    .then((response: AxiosResponse) => response.data)
}
