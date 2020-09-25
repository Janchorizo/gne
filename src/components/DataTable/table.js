import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


export default function Table({data}) {
  if (data === null) {
    return '';
  }

  const [expanded, setExpanded] = useState(false);

  const tableCssClasses = [
    'primary',
    style.table,
    expanded === false ? style.collapsed : style.expanded
  ].join(' ');

  return <table className={tableCssClasses}>

  </table>
}

Table.propTypes = {
  data: PropTypes.object
};