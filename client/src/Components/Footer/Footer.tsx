import React from 'react'
import styles from './Footer.module.scss'
import centerDivide from '../../assets/images/centerDivide.svg'


const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
    <img src={centerDivide} alt="centerDivider"/>
    </footer>
  )
}

export default Footer
