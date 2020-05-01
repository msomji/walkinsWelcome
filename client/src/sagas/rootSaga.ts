import { all } from 'redux-saga/effects'
import { fetchRoomByHostIdSaga } from './rooms/fetchRoomsByHostId'
import { deleteRoomSaga } from './rooms/deleteRoomSaga'
import { createRoomSaga } from './rooms/createRoomSaga'
import { fetchAllRooms } from './rooms/fetchAllRoomsSaga'
import { fetchRoomsByHostIdSaga } from './user/fetchRoomsByHostIdSaga'
import { getInLineSaga } from './patients/getInLineSaga'
import { setUpVideoRoomSaga } from './videoRooms/setUpVideoRoomSaga'


export default function* rootSaga() {
  yield all([
    fetchAllRooms(),
    fetchRoomByHostIdSaga(),
    deleteRoomSaga(),
    createRoomSaga(),

    fetchRoomsByHostIdSaga(),

    getInLineSaga(),
    setUpVideoRoomSaga(),
  ])
}