import React from 'react';

import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';

export default function ClipboardCopy({msg, content, extraClassName=''}) {
  const className = `${style.clipboard} ${extraClassName}`;
  return <span
    data-tooltip={msg}
    className={className}
    onClick={() => ClipoardUtility.copy(content)}>📋</span>;
}
