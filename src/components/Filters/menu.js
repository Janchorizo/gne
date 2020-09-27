import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';
import filterInputs from './filterInputs.js';

const options = {
  address: 'Address',
  portCount: 'Port count',
  traffic: 'Traffic',
  incomingTraffic: 'Incoming traffic',
  ougoingTraffic: 'Outgoing traffic',
  ipVersion: 'IP version',
};

/**
 * Filter menu.
 * @param  {function} onAdd Callback for adding a filter.
 * @return {React.Component} A react component.
 */
export default function Menu({onAdd}) {
  const [dim, setDim] = useState(options.address);

  const dimOptions = Object.values(options).map((option) =>
    <option key={option} value={option}>{option}</option>);

  const filterInput = React.createElement(
      filterInputs[dim],
      {onAdd: (filterFunction) => onAdd(dim, filterFunction)},
  );

  return <div className={style.menu}>
    <span>Filter by :</span>
    <select value={dim} onChange={(e) => setDim(e.target.value)}>
      {dimOptions}
    </select>
    {filterInput}
  </div>;
}

Menu.propTypes = {
  onAdd: PropTypes.func,
};
