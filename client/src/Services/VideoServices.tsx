import axios, { AxiosResponse } from 'axios';
import { Patient } from '../store/Patient/PatientReducer';

export async function getVideoAuthToken(roomId: string, hostName: string): Promise<string> {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/video-token/roomId/${roomId}/name/${hostName}`)
    .then((response: AxiosResponse) => response.data)
}


export async function getVideoAuthTokenForPatient(roomId: string): Promise<Patient> {
  
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/video-token/patients/roomId/${roomId}`)
    .then((response: AxiosResponse) => response.data)
}