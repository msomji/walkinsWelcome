import axios, { AxiosResponse } from 'axios';
import { Room } from '../store/room/RoomReducer';

export async function createRoom(room: Room): Promise<string> {
  console.log(room)
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/rooms`, room)
    .then((response: AxiosResponse) => response.data.id)
}
export async function deleteRoom(roomId: string): Promise<string> {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/rooms/${roomId}` )
    .then((response: AxiosResponse) => response.data.id)
}

export async function fetchRoomByHostId(hostId: String): Promise<Array<Room>> {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/rooms/host/${hostId}`)
    .then((response: AxiosResponse) => response.data)
}

export async function fetchRooms(): Promise<Array<Room>> {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/rooms`)
    .then((response: AxiosResponse) => response.data)
}
