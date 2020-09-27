import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import scrollIntoView from 'scroll-into-view-if-needed';
import * as d3 from 'd3';

import style from './style.module.css';
import * as cells from './tableCells.js';


/**
 * Create a HTML selector-safe from joining a prefix and address.
 * @param   {string} prefix Prefix to add.
 * @param   {string} address Address to join.
 * @return {string} The resulting indentifier.
 */
function joinPrefixWithAddress(prefix, address) {
  return prefix + '-' + address.replace(/[\.\:]/g, '-');
}

/**
 * Highlight and scroll into focused row.
 * @param   {object} table Table DOM node.
 * @param   {string} focused Focused node IP address.
 */
function onFocusChange(table, focused) {
  d3.select(table)
      .select('.'+style.focused)
      .classed(style.focused, false);
  if (focused !== null) {
    const node = d3.select(table)
        .select('#'+joinPrefixWithAddress('row', focused))
        .classed(style.focused, true)
        .node();
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }
}

/**
 * Collapsible table showing network details.
 * @param   {object} data The network.
 * @param   {string} focused Focused network node's address.
 * @param   {function} setFocused Callback to set the focused node.
 * @return {React.Component} A react component.
 */
export default function Table({data, focused, setFocused}) {
  if (data === null) {
    return '';
  }

  const [expanded, setExpanded] = useState(false);
  const tableRef = useRef();

  useEffect(() => onFocusChange(tableRef.current, focused), [focused]);

  const toggleMessage = expanded === true ?
    'Collapse table ❱' :
    '❰ Expand table';

  const tableCssClasses = [
    'primary',
    style.table,
    expanded === false ? style.collapsed : style.expanded,
  ].join(' ');

  const connectionCount =
    data.links.reduce((ac, dc) => ac + dc.count, 0);

  const rows = data.nodes.map((node) =>
    <tr key={node.address}
      id={joinPrefixWithAddress('row', node.address)}
      onMouseEnter={() => setFocused(node.address)}
      onMouseLeave={() => setFocused(null)}>
      <cells.PortsCell node={node}/>
      <cells.AddressCell node={node}/>
      <cells.TrafficCell node={node}/>
      <cells.PortTrafficCell node={node}/>
    </tr>,
  );

  return <table ref={tableRef} className={tableCssClasses}>
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
          Traffic <i>({connectionCount})</i>
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
  focused: PropTypes.string,
  setFocused: PropTypes.func,
};
