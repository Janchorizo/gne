import React from 'react';

import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';

export default function ClipboardCopy({msg, content}) {
  return <span 
    data-tooltip={msg}
    className={style.clipboard}
    onClick={() => ClipoardUtility.copy(content)}>📋</span>;
}