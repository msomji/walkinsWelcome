import { combineReducers } from 'redux'
import { UserReducer } from './user/userReducer'
import { RoomReducer } from './room/RoomReducer'

export const rootReducer = combineReducers({
  user: UserReducer,
  rooms: RoomReducer
})

export type AppState = ReturnType<typeof rootReducer>