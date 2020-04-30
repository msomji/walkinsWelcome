import React from 'react'
import styles from './Room.module.scss'

export interface RoomComponentProps {
    currentUserIsHost: boolean;
    name: string;
    imageUrl: string;
    speciality: string;
    location: string;
    patientsInLine: number;
    onGetInLine: (e: any) => void;
    callNextPatient: (e: any) => void;
    deleteRoom: (e: any) => void;
}

const RoomComponent  : React.FC<RoomComponentProps> = ({currentUserIsHost, name, imageUrl, speciality, location, patientsInLine, onGetInLine, deleteRoom }) => {

    return (
        <div className={`${styles.room}`}>
            {currentUserIsHost ? <span onClick={deleteRoom}>Close</span> : <span/>}
            <img src={imageUrl} alt="host profile"/>
            <h1>{name}</h1>
            <h2>{speciality}</h2>
            <h3>{location}</h3>
            
            {currentUserIsHost ? <button onClick={onGetInLine}>Call Next Patient</button> :
            <button onClick={onGetInLine}>Get In Line</button>
            }
            <p>There are {patientsInLine} patients in line</p>
        </div>
    )
}


export default RoomComponent;