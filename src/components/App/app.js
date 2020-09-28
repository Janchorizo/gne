import React, {useState} from 'react';

import {TopBar, Workspace, Filters} from 'components';

import style from './style.module.css';
import lightTheme from 'themes/light.module.css';
import darkTheme from 'themes/dark.module.css';


const now = (new Date()).getHours();
const isDay = 9 <= now && now <= 20;

/**
 * Top level root node for the app.
 * @return {React.Component} A react component.
 */
export default function App() {
  const [usingLightTheme, setUsingLightTheme] = useState(isDay);
  const [usingEspLang, setUsingEspLang] = useState(true);
  const [fetched, setFetched] = useState(null);
  const [data, setData] = useState(null);
  const [focused, setFocused] = useState(null);

  const cssClasses = [
    style.app,
    usingLightTheme === true ? lightTheme.theme : darkTheme.theme,
  ].join(' ');

  return <div className={cssClasses}>
    <TopBar {... {
      usingLightTheme,
      setUsingLightTheme,
      usingEspLang,
      setUsingEspLang,
      setData: setFetched}} />
    <Workspace data={data} {...{focused, setFocused}}/>
    <Filters {...{fetched, setData}}/>
  </div>;
}

App.propTypes = {};
