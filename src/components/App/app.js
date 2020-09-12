import React, {useState} from 'react'

import style from './style.module.css'
import lightTheme from 'themes/light.module.css'
import darkTheme from 'themes/dark.module.css'


export default function App(props) {
  const [useLightTheme, setUseLightTheme] = useState(true)
  const cssClasses = [
    style.app,
    useLightTheme === true ? lightTheme.theme : darkTheme.theme
  ].join(' ')
  
  return <div className={cssClasses} onClick={() => setUseLightTheme(!useLightTheme)}>
    <h1>GNE Graphviz Network Explorer</h1>
    </div>
}

App.propTypes = {}
