import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';
import * as cells from './tableCells.js';


/**
 * Collapsible table showing network details.
 * @param   {object} data The network.
 * @return {React.Component} A react component.
 */
export default function Table({data, setFocused}) {
  if (data === null) {
    return '';
  }

  const [expanded, setExpanded] = useState(false);
  const toggleMessage = expanded === true ?
    'Collapse table ❱' :
    '❰ Expand table';

  const tableCssClasses = [
    'primary',
    style.table,
    expanded === false ? style.collapsed : style.expanded,
  ].join(' ');

  const rows = data.nodes.map((node) =>
    <tr key={node.address}
        onMouseEnter={() => setFocused(node.address)}
        onMouseLeave={() => setFocused(null)}>
      <cells.PortsCell node={node}/>
      <cells.AddressCell node={node}/>
      <cells.TrafficCell node={node}/>
      <cells.PortTrafficCell node={node}/>
    </tr>,
  );

  return <table className={tableCssClasses}>
    <thead>
      <tr>
        <th
          className={style.toggle}
          onClick={()=> setExpanded(!expanded)}
          colSpan="5">
          <button>{toggleMessage}</button>
        </th>
      </tr>
      <tr>
        <th className={style.portsCell}>Ports</th>
        <th>Address <i>({data.nodes.length})</i></th>
        <th className={style.trafficCell}>
          Traffic <i>({data.links.length})</i>
        </th>
        <th className={style.portTrafficCell}>Port traffic</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>;
}

Table.propTypes = {
  data: PropTypes.object,
};
