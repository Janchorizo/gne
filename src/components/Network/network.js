import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

export default function Network({data}) {
  if (data === null) {
    return '';
  }

  return <svg className={style.network}>

  </svg>;
}

Network.propTypes = {
  data: PropTypes.object,
};
