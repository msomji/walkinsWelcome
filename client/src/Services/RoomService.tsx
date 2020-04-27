import axios, { AxiosResponse } from 'axios';
import { Room } from '../store/room/RoomReducer';

export async function createRoom(room: Room): Promise<string> {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rooms`, room)
    .then((response: AxiosResponse) => response.data.id)
}
export async function deleteRoomByHostId(hostId: string): Promise<string> {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rooms/host`, hostId)
    .then((response: AxiosResponse) => response.data.id)
}

export async function fetchRoomByHostId(hostId: String): Promise<Array<Room>> {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/rooms/host/${hostId}`)
    .then((response: AxiosResponse) => response.data)
}
