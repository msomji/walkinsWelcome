import axios, { AxiosResponse } from 'axios';
import { Patient } from '../store/Patient/PatientReducer';


export async function createPatient(patient: Patient): Promise<string> {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/patients`, patient)
    .then((response: AxiosResponse) => response.data.id)
}