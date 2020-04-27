import { RoomActions, CREATE_ROOM_SUCCESS, DELETE_ROOM_SUCCESS, FETCH_ROOMS_BY_HOST_ID, FETCH_ROOMS_BY_HOST_ID_SUCCESS } from "./RoomActions";
import { runInThisContext } from "vm";

export interface Room {
    hostId: string,
    phoneNumber: string,
    description?: string,
    speciality?: string,
    location?: string,
    language: Array<string>,
}

export interface RoomState {
    filteredRooms: Array<Room>,
    allRooms: Array<Room>,
    roomsHosting: Array<Room>,
    roomsInLine: Array<Room>
}
const initialState: RoomState = {
    filteredRooms: [],
    allRooms: [],
    roomsHosting: [],
    roomsInLine: []
}


export const RoomReducer = (state = initialState, action: RoomActions) => {
    switch(action.type) {
        case CREATE_ROOM_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms, action.payload],
                roomsHosting: [...state.roomsHosting, action.payload],
            }
        }
        case DELETE_ROOM_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms].filter(r => r.hostId == action.payload),
                roomsHosting: [...state.roomsHosting].filter(r => r.hostId == action.payload),
            }
        }
        case FETCH_ROOMS_BY_HOST_ID_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms, ...action.payload],
                    roomsHosting: [...state.roomsHosting, ...action.payload],
            }
        }
        default: return {...state}
    }

    
}