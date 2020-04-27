import React from 'react'
import styles from './About.module.scss'
import process from '../../assets/images/process.svg'

import centerDivide from '../../assets/images/centerDivide.svg'

const About = () => {
    return (
      <section id="about" className={`${styles.about}`}>
          <h1 className="is-primary is-size-3 has-text-weight-semibold has-text-centered">WAITING ROOMS ARE HISTORY</h1>
          <h2 className="is-primary is-size-4 has-text-weight-medium has-text-centered">In 3 easy steps, recieve a text or email to join a video call with an Experienced Professional.</h2>
          <img className={`${styles.process}`} src={process} alt=""/>
          <img src={centerDivide} alt="centerDivider"/>
      </section>
    )
  }
  
  export default About
  