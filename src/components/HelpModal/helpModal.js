import React, {useState} from 'react'

import style from './style.module.css'


export default function HelpModal() {
  const [shown, show] = useState(false)

  return <div className={style.helpModal}>
    <div className={style.toggle}>
      <button className={shown === false ? '' : style.toggled}
          onClick={() => show(!shown)}
        >Help
      </button>
    </div>
    <div className={style.container + ' ' + (shown === false ? style.none : '')}>
      <p>click on whatever</p>
    </div>
  </div>
}

HelpModal.propTypes = {}
