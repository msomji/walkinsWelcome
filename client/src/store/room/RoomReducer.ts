import { RoomActions, CREATE_ROOM_SUCCESS, DELETE_ROOM_SUCCESS, FETCH_ROOMS_BY_HOST_ID_SUCCESS, FETCH_ALL_ROOMS_SUCCESS } from "./RoomActions";


export interface Room {
    _id?: string,
    hostId: string,
    hostName:string
    imageUrl: string,
    phoneNumber: string,
    description: string,
    speciality: string,
    location: string,
    languages: Array<string>,
}

export interface RoomState {
    filteredRooms: Array<Room>,
    allRooms: Array<Room>,
}
const initialState: RoomState = {
    filteredRooms: [],
    allRooms: [],
}


export const RoomReducer = (state = initialState, action: RoomActions) => {
    switch(action.type) {
        case CREATE_ROOM_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms, action.payload],
            }
        }
        case DELETE_ROOM_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms].filter(r => r._id !== action.payload),
            }
        }
        case FETCH_ROOMS_BY_HOST_ID_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms, ...action.payload],
            }
        }
        case FETCH_ALL_ROOMS_SUCCESS: {
            return {
                ...state,
                allRooms: [...state.allRooms, ...action.payload],
            }
        }
        default: return {...state}
    }

    
}