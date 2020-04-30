import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import About from './Components/About/About'
import Footer from './Components/Footer/Footer'
import { HeaderContainer } from './Containers/HeaderContainer'
import { LobbyContainer } from './Containers/LobbyContainer'
import { useDispatch } from 'react-redux'
import { fetchRoomsAllRooms } from './store/room/RoomActions'
import VideoCall from './Components/VideoCall/VedeoCall.component'

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomsAllRooms())
  }, [dispatch])

  return (
    <BrowserRouter>
          <VideoCall/>
      <div className={`${styles.app} has-primary-background`}>
        <HeaderContainer/>
        <main>
          <About />
          <LobbyContainer/>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
