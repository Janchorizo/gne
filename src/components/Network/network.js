import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


/**
 * Interactive node-link diagram showing the network.
 * @param   {object} data The network.
 * @return {React.Component} A react component.
 */
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
