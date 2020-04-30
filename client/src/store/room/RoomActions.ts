import { Room } from "./RoomReducer"

export const FETCH_ALL_ROOMS = 'FETCH_ALL_ROOMS'
export const FETCH_ALL_ROOMS_SUCCESS = 'FETCH_ALL_ROOMS_SUCCESS'
export const FETCH_ALL_ROOMS_FAILED = 'FETCH_ALL_ROOMS_FAILED'

export const FETCH_ROOMS_BY_HOST_ID = 'FETCH_ROOMS_BY_HOST_ID'
export const FETCH_ROOMS_BY_HOST_ID_SUCCESS = 'FETCH_ROOMS_BY_HOST_ID_SUCCESS'
export const FETCH_ROOMS_BY_HOST_ID_FAILED = 'FETCH_ROOMS_BY_HOST_ID_FAILED'

export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED'

export const DELETE_ROOM = 'DELETE_ROOM'
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS'
export const DELETE_ROOM_FAILED = 'DELETE_ROOM_FAILED'

export const FETCH_ROOMS_BY_PATIENT_ID = 'FETCH_ROOMS_BY_PATIENT_ID'
export const FETCH_ROOMS_BY_PATIENT_ID_SUCCESS = 'FETCH_ROOMS_BY_PATIENT_ID_SUCCESS'
export const FETCH_ROOMS_BY_PATIENT_ID_FAILED = 'FETCH_ROOMS_BY_PATIENT_ID_FAILED'

export interface FetchRoomsAllRooms {
    type: typeof FETCH_ALL_ROOMS
}
export interface fetchRoomsAllRoomsSuccess {
    payload: Array<Room>
    type: typeof FETCH_ALL_ROOMS_SUCCESS
}
export interface fetchRoomsAllRoomsFailed {
    payload: string
    type: typeof FETCH_ALL_ROOMS_FAILED
}
export interface FetchRoomsByHostId {
    payload: string
    type: typeof FETCH_ROOMS_BY_HOST_ID 
}
export interface FetchRoomsByHostIdSuccess {
    payload: Array<Room>
    type: typeof FETCH_ROOMS_BY_HOST_ID_SUCCESS 
}

export interface FetchRoomsByHostIdFailed {
    payload: string
    type: typeof FETCH_ROOMS_BY_HOST_ID_FAILED 
}

// export interface FetchRoomsByPatientIdFailed {
//     payload: string
//     type: typeof FETCH_ROOMS_BY_PATIENT_ID_FAILED
// }
// export interface FetchRoomsByPatientId {
//     payload: string
//     type: typeof FETCH_ROOMS_BY_PATIENT_ID
// }
// export interface FetchRoomsByPatientIdSuccess {
//     payload: Array<Room>
//     type:  typeof FETCH_ROOMS_BY_PATIENT_ID_SUCCESS
// }

export interface CreateRoom {
    payload: Room,
    type: typeof CREATE_ROOM
}
export interface CreateRoomSuccess {
    payload: Room,
    type: typeof CREATE_ROOM_SUCCESS
}
export interface CreateRoomFailed {
    payload: string,
    type: typeof CREATE_ROOM_FAILED
}

export interface DeleteRoom {
    payload: string,
    type: typeof DELETE_ROOM
}
export interface DeleteRoomSuccess {
    payload: string,
    type: typeof DELETE_ROOM_SUCCESS
}
export interface DeleteRoomFailed {
    payload: string,
    type: typeof DELETE_ROOM_FAILED
}


export const fetchRoomsAllRooms = () :FetchRoomsAllRooms => ({type: FETCH_ALL_ROOMS})
export const fetchRoomsAllRoomsSuccess = (payload: Array<Room>): fetchRoomsAllRoomsSuccess => ({type: FETCH_ALL_ROOMS_SUCCESS, payload})
export const fetchRoomsAllRoomsFailed = (error: string): fetchRoomsAllRoomsFailed => ({type: FETCH_ALL_ROOMS_FAILED, payload:error})

export const fetchRoomsByHostId = (payload: string):FetchRoomsByHostId => ({type: FETCH_ROOMS_BY_HOST_ID, payload})
export const fetchRoomsByHostIdSuccess = (payload: Array<Room>): FetchRoomsByHostIdSuccess => ({type: FETCH_ROOMS_BY_HOST_ID_SUCCESS, payload})
export const fetchRoomsByHostIdFailed = (payload: string): FetchRoomsByHostIdFailed => ({type: FETCH_ROOMS_BY_HOST_ID_FAILED, payload})

// export const fetchRoomsByPatientId = (payload: string):FetchRoomsByPatientId => ({type: FETCH_ROOMS_BY_PATIENT_ID, payload})
// export const fetchRoomsByPatientIdSuccess = (payload: Array<Room>): FetchRoomsByPatientIdSuccess => ({type: FETCH_ROOMS_BY_PATIENT_ID_SUCCESS, payload})
// export const fetchRoomsByPatientIdFailed = (payload: string): FetchRoomsByPatientIdFailed => ({type: FETCH_ROOMS_BY_PATIENT_ID_FAILED, payload})


export const createRoom = (payload: Room): CreateRoom => ({type: CREATE_ROOM, payload})
export const createRoomSuccess = (payload: Room): CreateRoomSuccess => ({type: CREATE_ROOM_SUCCESS, payload})
export const createRoomFailed = (payload: string): CreateRoomFailed => ({type: CREATE_ROOM_FAILED, payload})

export const deleteRoom = (roomId: string): DeleteRoom => ({type: DELETE_ROOM, payload: roomId})
export const deleteRoomSuccess = (roomId: string): DeleteRoomSuccess => ({type: DELETE_ROOM_SUCCESS, payload: roomId})
export const deleteRoomFailed = (payload: string): DeleteRoomFailed => ({type: DELETE_ROOM_FAILED, payload})


export type RoomActions = FetchRoomsAllRooms
                | fetchRoomsAllRoomsSuccess
                | fetchRoomsAllRoomsFailed
                | FetchRoomsByHostId 
                | FetchRoomsByHostIdSuccess 
                | FetchRoomsByHostIdFailed 
                | CreateRoom 
                | CreateRoomSuccess 
                | CreateRoomFailed 
                | DeleteRoom 
                | DeleteRoomSuccess 
                | DeleteRoomFailed;
