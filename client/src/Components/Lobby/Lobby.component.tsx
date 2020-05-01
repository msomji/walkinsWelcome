import React, { useState, useEffect } from 'react'
import styles from './Lobby.module.scss'
import { RoomState, Room } from '../../store/room/RoomReducer'
import { useDispatch } from 'react-redux'
import { createRoom, deleteRoom } from '../../store/room/RoomActions'
import { UserState } from '../../store/user/userReducer'
import RoomComponent from '../Room/Room.component'
import { Patient } from '../../store/Patient/PatientReducer'
import { getInLine } from '../../store/Patient/PatientActions'
import { useHistory } from 'react-router'
import { getVideoToken, clearVideoToken } from '../../store/VideoRoom/VideoTokenActions'
import VideoCall from '../VideoCall/VideoCall.component'
import { TokenState } from '../../store/VideoRoom/TokenReducer'


export interface LobbyProps {
  roomState: RoomState
  user: UserState,
  tokenState: TokenState

}

const defaultRoom = {
  description: '',
  speciality: '',
  hostName: '',
  phoneNumber: '',
  location: 'USA',
  languages: ["eng"]
}
const defaultPatient = {
  name: '',
  phoneNumber: '',
  roomId: '',
  description: ''
}

const Lobby: React.FC<LobbyProps> = ({ user, roomState, tokenState }) => {
  const dispatch = useDispatch();
  const [canCreateRoom, setcanCreateRoom] = useState(true)
  const [hideCreateRoomForm, sethideCreateRoomForm] = useState(true)
  const [hideSeeNextPatient, setHideSeeNextPatient] = useState(true)
  
  const [hideGetInLineForm, setHideGetInLineForm] = useState(true)
  
  const [newPatient, setNewPatient] = useState({...defaultPatient})

  const [newRoom, setNewRoom] = useState({...defaultRoom})

  useEffect(() => {
    setcanCreateRoom(user.isLoggedIn)
  }, [user])
  function onClick(e: any) {
    setcanCreateRoom(!canCreateRoom);
    sethideCreateRoomForm(!hideCreateRoomForm)

  }
  const onConsultModalClose = (e:any) => {
    dispatch(clearVideoToken());
    setHideSeeNextPatient(true);
    // update number of patients 
  }
  const callNextPatient = (roomId?:string, hostName?: string) => (e:any) => {
    e.preventDefault();
    if(roomId !== undefined && hostName !== undefined) {
        dispatch(getVideoToken({roomId, hostName}));
        setHideSeeNextPatient(false)
    }
  }
  const onGetInLine = (roomId?:string) => (e:any) => {
    e.preventDefault();
    if(roomId !== undefined) {
      setNewPatient({
        ...newPatient,
        roomId,
      })
      setHideGetInLineForm(false)
    }
  }

  const onDeleteRoom = (hostId: string, roomId?: string) => (e: any) => {
    if (user.user?.googleId === hostId && roomId !== undefined) {
      dispatch(deleteRoom(roomId))
    }
  }

  const handleChangeRoom = (key: string) => (event: any) => {
    setNewRoom({
      ...newRoom,
      [key]: event.target.value,
    })
  }
  const handleChangePatient = (key: string) => (event: any) => {
    setNewPatient({
      ...newPatient,
      [key]: event.target.value,
    })
  }
  const onCreateRoom = (e: any) => {
    e.preventDefault();
    const room: Room = {
      hostId: user.user!.googleId,
      hostName: newRoom.hostName || user.user!.name,
      imageUrl: user.user!.imageUrl,
      phoneNumber: newRoom.phoneNumber || '',
      description: newRoom.description,
      speciality: newRoom.speciality,
      location: newRoom.location,
      languages: newRoom.languages,
    }

    dispatch(createRoom(room))
    setNewRoom({...defaultRoom})
    sethideCreateRoomForm(true)
  }
  const onCreatePatient = (e: any) => {
    e.preventDefault();
    const patient: Patient = {
      roomId: newPatient.roomId,
      phoneNumber: parseInt(newPatient.phoneNumber),
      descriprion: newPatient.description,
      name: newPatient.name
    }

    dispatch(getInLine(patient))
    setNewPatient({...defaultPatient})
    setHideGetInLineForm(true)
  }

  const orderedRooms = roomState.allRooms.reduce((accum: Room[], currentRoom: Room, index: number) => {
    if (user.isLoggedIn && currentRoom.hostId === user.user?.googleId) {
      return [currentRoom, ...accum]
    } else {
      return [...accum, currentRoom]
    }
  }, [])
    .map((room, index) => <RoomComponent
      key={index}
      currentUserIsHost={user.user?.googleId === room.hostId}
      name={room.hostName} //add name to room model
      imageUrl={room.imageUrl}
      speciality={room.speciality || "General Medicine"}
      location={room.location || "USA"}
      patientsInLine={3}
      callNextPatient={callNextPatient(room._id, room.hostName)}
      onGetInLine={onGetInLine(room._id)}
      deleteRoom={onDeleteRoom(room.hostId, room._id)} />)

  return (
    <section id="lobby" className={`${styles.lobby}`}>
      <div className={`${styles.lobbyHeader}`}>
        <h1 className="is-primary is-size-2 has-text-weight-bold has-text-centered">Lobby</h1>
        {canCreateRoom && <button className={`${styles.createRoom}`} onClick={onClick}>New Room</button>}
      </div>

      {/* host video room modal */}
      <div className={`${styles.modal} ${hideSeeNextPatient && styles.hidden}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h1 className="is-primary is-size-2 has-text-weight-bold has-text-centered">Consultation Room</h1>
            <span onClick={onConsultModalClose} className="close">&times;</span>
          </div>
          {tokenState.tokenLoaded === true && <VideoCall  token={tokenState.token}/>}

        </div>
      </div>
      {/* host room modal */}
      <div className={`${styles.modal} ${hideCreateRoomForm && styles.hidden}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h1 className="is-primary is-size-2 has-text-weight-bold has-text-centered">Host a Room</h1>
            <span onClick={() => { sethideCreateRoomForm(true); setcanCreateRoom(true) }} className="close">&times;</span>
          </div>
          <form onSubmit={(e) => onCreateRoom(e)}>
          <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="hostName">Name
              <input value={newRoom.hostName} type="text" onChange={handleChangeRoom("hostName")} id="hostName" name="hostName" />
              </label>
            </div>
            <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="spciality">Medical Speciality
              <input value={newRoom.speciality} type="text" onChange={handleChangeRoom("speciality")} id="speciality" name="speciality" />
              </label>
            </div>
            <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="description">Description
              <input value={newRoom.description} onChange={handleChangeRoom("description")} type="text" id="description" name="description" />
              </label>
            </div>
            <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="phoneNumber">Phone Number(Whatsapp)
              <input value={newRoom.phoneNumber} placeholder="+19999999999" type="tel" onChange={handleChangeRoom("phoneNumber")} id="phoneNumber" name="phoneNumber" />
              </label>
            </div>

            <button className={`${styles.createRoom}`} type="submit">Create</button>
          </form>
        </div>
      </div>


      {/* getInLineForm */}
      <div className={`${styles.modal} ${hideGetInLineForm && styles.hidden}`}>
        <div className={`${styles.modalContent}`}>
          <div className={`${styles.modalHeader}`}>
            <h1 className="is-primary is-size-2 has-text-weight-bold has-text-centered">Get In Line</h1>
            <span onClick={() => { setHideGetInLineForm(true) }} className="close">&times;</span>
          </div>
          <form onSubmit={(e) => onCreatePatient(e)}>
          <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="Name">Name
              <input value={newPatient.name} type="text" onChange={handleChangePatient("name")} id="name" name="name" />
              </label>
            </div>
            <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="phoneNumber">Phone Number(Whatsapp)
              <input value={newPatient.phoneNumber} type="tel" onChange={handleChangePatient("phoneNumber")} id="phoneNumber" name="phoneNumber" />
              </label>
            </div>
            <div>
              <label className="is-primary is-size-6 has-text-weight-semibold" htmlFor="description">Description
              <input value={newPatient.description} onChange={handleChangePatient("description")} type="text" id="description" name="description" />
              </label>
            </div>
            <button className={`${styles.createRoom}`} type="submit">Submit</button>
            <p>You will recieve a text message with a link for a video call when the Doctor is ready.</p>
          </form>
        </div>
      </div>

      <div className={`${styles.roomContainer}`}>
        {orderedRooms.length > 0? orderedRooms : <h3>There are no rooms currently available, please try again later</h3>}
      </div>
    </section>
  )
}

export default Lobby
