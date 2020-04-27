import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import About from './Components/About/About'
import Footer from './Components/Footer/Footer'
import { HeaderContainer } from './Containers/HeaderContainer'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <div className={`${styles.app} has-primary-background`}>
        <HeaderContainer/>
        <main>
          <About />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
