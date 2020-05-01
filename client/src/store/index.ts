import { combineReducers } from 'redux'
import { UserReducer } from './user/userReducer'
import { RoomReducer } from './room/RoomReducer'
import { TokeReducer } from './VideoRoom/TokenReducer'

export const rootReducer = combineReducers({
  user: UserReducer,
  rooms: RoomReducer,
  token: TokeReducer,
})

export type AppState = ReturnType<typeof rootReducer>