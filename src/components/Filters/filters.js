import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


/**
 * Filter container.
 * @return {React.Component} A react component.
 */
export default function Filters({data, setData}) {
  const [adding, seAdding] = useState(false);

  return <div className={style.filters}>
  </div>;
}

Filters.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
};
