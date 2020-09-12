import React from 'react'

import style from './style.module.css'


export default function TopBar({usingLightTheme, setUsingLightTheme, lang, setLang, setData}) {
  
  const cssClasses = [
    style.topBar,
    'flex',
    'six',
    'grow'
  ].join(' ')

  const lightIcon = usingLightTheme === true ? 'on' : 'off';
  const darkIcon = usingLightTheme === false ? 'on' : 'off';

  return <div className={cssClasses}>
    <div className="">
      <h1>GNE</h1>
      <h2>Graphviz Network Explorer</h2>
    </div>
    <div className="two-third">
    </div>
    <div className={style.optionsContainer}>
      <button className={style.themeToggle} onClick={() => setUsingLightTheme(!usingLightTheme)}>
        <span className={"mu mu-radio-" + darkIcon} /> dark mode
        <hr/>
        light mode <span className={"mu mu-radio-" + lightIcon}/>
      </button>
    </div>
  </div>
}
