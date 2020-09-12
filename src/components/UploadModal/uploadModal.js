import React, {useState} from 'react';

import style from './style.module.css';


export default function UploadModal() {
  const [shown, show] = useState(false);

  const containerStyles = [
    style.container,
    shown === false ? style.none : '',
  ].join(' ');

  return <div className={style.uploadModal}>
    <div className={style.toggle}>
      <button className={shown === false ? '' : style.toggled}
        onClick={() => show(!shown)}
      >Upload
      </button>
    </div>
    <div className={containerStyles}>
      <p>
        Change the graph to be explored.
      </p>
    </div>
  </div>;
}

UploadModal.propTypes = {};
