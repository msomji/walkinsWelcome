import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import styles from './App.module.scss'
import About from './Components/About/About'
import Footer from './Components/Footer/Footer'
import { HeaderContainer } from './Containers/HeaderContainer'
import { LobbyContainer } from './Containers/LobbyContainer'
import { useDispatch } from 'react-redux'
import { fetchRoomsAllRooms } from './store/room/RoomActions'
import VideoCall from './Components/VideoCall/VideoCall.component'
import VideoRoom from './Components/VideoRoom/VideoRoom.component'

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomsAllRooms())
  }, [dispatch])

  return (
    <>
          
      <div className={`${styles.app} has-primary-background`}>
        <HeaderContainer/>
        <main>
          <About />
          <LobbyContainer/>
        </main>
        <Footer />
      </div>

    </>
  )
}

export default App
