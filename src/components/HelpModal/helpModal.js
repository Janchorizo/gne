import React, {useState} from 'react';

import style from './style.module.css';


/**
 * Help modal for the top bar.
 * @return {React.Component} A react component.
 */
export default function HelpModal() {
  const [shown, show] = useState(false);

  const containerStyles = [
    style.container,
    shown === false ? style.none : '',
  ].join(' ');

  return <div className={style.helpModal}>
    <div className={style.toggle}>
      <button className={shown === false ? '' : style.toggled}
        onClick={() => show(!shown)}
      >Help
      </button>
    </div>
    <div className={containerStyles}>
      <p>
        GNE is a tool intended to facilitate the explocartion
        of Graphviz output network graphs.
      </p>
    </div>
  </div>;
}

HelpModal.propTypes = {};
