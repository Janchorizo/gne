import React from 'react'

import style from './style.module.css'


export default function TopBar({usingLightTheme, setUsingLightTheme, usingEspLang, setUsingEspLang, setData}) {
  
  const cssClasses = [
    style.topBar,
    'flex',
    'six',
    'grow'
  ].join(' ')

  const lightIcon = usingLightTheme === true ? 'on' : 'off';
  const darkIcon = usingLightTheme === false ? 'on' : 'off';
  const espIcon = usingEspLang === true ? 'on' : 'off';
  const engIcon = usingEspLang === false ? 'on' : 'off';

  return <div className={cssClasses}>
    <div className="">
      <h1>GNE</h1>
      <h2>Graphviz Network Explorer</h2>
    </div>
    <div className="two-third">
    </div>
    <div className={style.optionsContainer}>
      <button className={style.toggleButton} onClick={() => setUsingLightTheme(!usingLightTheme)}>
        light mode <span className={"mu mu-radio-" + lightIcon}/>
        <hr/>
        <span className={"mu mu-radio-" + darkIcon} /> dark mode
      </button>
      <button className={style.toggleButton} onClick={() => setUsingEspLang(!usingEspLang)}>
        esp <span className={"mu mu-radio-" + espIcon}/>
        <hr/>
        <span className={"mu mu-radio-" + engIcon} /> eng
      </button>
    </div>
  </div>
}
