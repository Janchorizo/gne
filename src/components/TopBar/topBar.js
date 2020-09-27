import React from 'react';
import PropTypes from 'prop-types';

import {HelpModal, UploadModal} from 'components';
import style from './style.module.css';


/**
 * Layout component for the app's top bar.
 * @param   {bool} usingLightTheme Boolean indicating if light theme is used.
 * @param   {function} setUsingLightTheme Function to toggle between languages.
 * @param   {bool} usingEspLang Boolean indicating if Spanish is used.
 * @param   {function} setUsingEspLang Function to toggle between languages.
 * @param   {function} setData Function to set the retrieved data.
 * @return  {React.Component} A React component
 */
export default function TopBar({
  usingLightTheme,
  setUsingLightTheme,
  usingEspLang,
  setUsingEspLang,
  setData}) {
  const cssClasses = [
    style.topBar,
    'flex',
    'six',
    'grow',
  ].join(' ');

  const lightIcon = usingLightTheme === true ? 'on' : 'off';
  const darkIcon = usingLightTheme === false ? 'on' : 'off';
  const espIcon = usingEspLang === true ? 'on' : 'off';
  const engIcon = usingEspLang === false ? 'on' : 'off';

  return <div className={cssClasses}>
    <div className={style.title}>
      <h1>GNE</h1>
      <h2>Graphviz Network Explorer</h2>
    </div>
    <div className={style.middleContainer + ' two-third'}>
      <UploadModal setData={setData}/>
      <HelpModal />
    </div>
    <div className={style.optionsContainer}>
      <button
        className={style.toggleButton}
        onClick={() => setUsingLightTheme(!usingLightTheme)}>
          light
        <span className={style.extraText}> mode</span>
        <span className={'mu mu-radio-' + lightIcon}/>
        <hr/>
        <span className={'mu mu-radio-' + darkIcon} />
          dark
        <span className={style.extraText}> mode</span>
      </button>
      <button
        className={style.toggleButton}
        onClick={() => setUsingEspLang(!usingEspLang)}>
        esp <span className={'mu mu-radio-' + espIcon}/>
        <hr/>
        <span className={'mu mu-radio-' + engIcon} /> eng
      </button>
    </div>
  </div>;
}

TopBar.propTypes = {
  usingLightTheme: PropTypes.bool,
  usingEspLang: PropTypes.bool,
  setUsingLightTheme: PropTypes.func,
  setUsingEspLang: PropTypes.func,
  setData: PropTypes.func,
};
