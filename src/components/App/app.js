import React, {useState, useEffect} from 'react';

import {TopBar, Workspace} from 'components';
import {processNetwork} from 'common/helpers';
import expectedResponse from 'common/network.json';

import style from './style.module.css';
import lightTheme from 'themes/light.module.css';
import darkTheme from 'themes/dark.module.css';


const now = (new Date()).getHours();
const isDay = 9 <= now && now <= 20;

export default function App(props) {
  const [usingLightTheme, setUsingLightTheme] = useState(isDay);
  const [usingEspLang, setUsingEspLang] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    processNetwork(expectedResponse).then(setData);
  }, []);
  //  console.log(data);

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
      setData}} />
    <Workspace data={data}/>
  </div>;
}

App.propTypes = {};
