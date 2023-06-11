import s from './s.module.css'
import React from 'react'

export default function Gradients():JSX.Element{
  return (
    <div className={s.gradients} >
        <div className={s.gradient}></div>
        <div className={s.gradient}></div>
    </div>
  );
};