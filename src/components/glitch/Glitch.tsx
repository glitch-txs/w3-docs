import React, { ReactNode } from 'react'
import s from './s.module.css'

const Glitch = ({children}:{children:ReactNode}) => {
  return (
    <section className={s.container} >
      <div className={s.heroContainer}>
        <h2 className={[s.hero, s.glitch, s.layers].join(" ")} data-text={children}><span>{children}</span></h2>
      </div>
    </section>
  )
}

export default Glitch