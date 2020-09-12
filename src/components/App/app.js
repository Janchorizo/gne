import React, {useState} from 'react'

import {TopBar} from 'components'

import style from './style.module.css'
import lightTheme from 'themes/light.module.css'
import darkTheme from 'themes/dark.module.css'


export default function App(props) {
  const [usingLightTheme, setUsingLightTheme] = useState(true)
  const [lang, setLang] = useState(true)
  const [data, setData] = useState(true)

  const cssClasses = [
    style.app,
    usingLightTheme === true ? lightTheme.theme : darkTheme.theme
  ].join(' ')
  
  return <div className={cssClasses}>
    <TopBar {... {usingLightTheme, setUsingLightTheme, lang, setLang, setData}} />
    <h1>GNE Graphviz Network Explorer</h1>
    </div>
}

App.propTypes = {}
