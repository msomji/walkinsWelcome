import { all } from 'redux-saga/effects'
import { fetchRoomByHostIdSaga } from './rooms/fetchRoomsByHostId'
import { deleteRoomSaga } from './rooms/deleteRoomSaga'
import { createRoomSaga } from './rooms/createRoomSaga'


export default function* rootSaga() {
  yield all([
    fetchRoomByHostIdSaga(),
    deleteRoomSaga(),
    createRoomSaga()
  ])
}