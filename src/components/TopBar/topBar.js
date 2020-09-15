import React from 'react';
import PropTypes from 'prop-types';

import {HelpModal, UploadModal} from 'components';
import style from './style.module.css';


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
    <div className="">
      <h1>GNE</h1>
      <h2>Graphviz Network Explorer</h2>
    </div>
    <div className={style.middleContainer + ' two-third'}>
      <UploadModal />
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
