import React from 'react'
import styles from './Footer.module.scss'
import centerDivide from '../../assets/images/centerDivide.svg'


const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
    <img src={centerDivide} alt="centerDivider"/>
  <div>
  <h1 className="is-size-4 has-text-weight-semibold">© {new Date().getFullYear()} WalkinsWelcome</h1>
  </div>
    </footer>
  )
}

export default Footer
