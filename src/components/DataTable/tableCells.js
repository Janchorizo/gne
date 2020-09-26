import React from 'react';
import PropTypes from 'prop-types';

import {ClipboardCopy} from 'common/components';
import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';


/**
 * Table cell with a list of used ports and their traffic.
 * @param   {object} node A network node holding the address, type and ports.
 * @return {React.Component} A react component.
 */
export function PortTrafficCell({node}) {
  const portIsUsed = (port) => port.in.length + port.out.length >0;
  const usedPorts = Object.entries(node.ports).filter((p) => portIsUsed(p[1]));
  return (
    <td className={style.portTrafficCell}>
      <PortTraffic ports={usedPorts}/>
    </td>);
}

/**
 * Table cell with the node's address and address type.
 * @param   {object} node A network node holding the address, type and ports.
 * @return {React.Component} A react component.
 */
export function AddressCell({node}) {
  return (
    <td className={style.addressCell}>
      <b>
        {node.address}
        <ClipboardCopy msg="Click to copy" content={node.address}/>
      </b>
      <span className={style.addressType}>{node.type}</span>
    </td>);
}

/**
 * Table cell with the network's traffic.
 * @param   {object} node A network node holding the address, type and ports.
 * @return {React.Component} A react component.
 */
export function TrafficCell({node}) {
  const [inByPortConnections, outByPortConnections] = [
    Object.values(node.ports).reduce((ac, dc) => ac + dc.in.length, 0),
    Object.values(node.ports).reduce((ac, dc) => ac + dc.out.length, 0),
  ];
  const incoming = node.in.length + inByPortConnections;
  const outgoing = node.out.length + outByPortConnections;
  return (
    <td className={style.trafficCell}>
      <b>Total: {incoming + outgoing}</b><br/>
      <span className={style.trafficIcon}>⤓ </span>
      {incoming}
      <span className={style.trafficIcon}> ⤒ </span>
      {outgoing}
    </td>);
}

/**
 * Table cell holding each open port for the node.
 * @param   {object} node A network node holding the address, type and ports.
 * @return {React.Component} A react component.
 */
export function PortsCell({node}) {
  return (
    <td className={style.portsCell}>
      <div className={style.portContainer}>
        {Object.keys(node.ports).map((p) => <div
          data-tooltip={`Port ${p}. CLick to copy.`}
          onClick={() => ClipoardUtility.copy(p)}
          key={p}
          className={style.port}></div>)}
      </div>
    </td>);
}

/**
 * A list of cards with port traffic information.
 * @param   {list} ports A list of ports with in and out connections.
 * @return {React.Component} A react component.
 */
function PortTraffic({ports}) {
  return <div className={style.portTraffic}>
    {ports.map(([port, connections]) => {
      return <div key={port} className={style.portContainer}>
        <span className={style.portName}>
          <b>
            {port}
            <ClipboardCopy
              msg="Click to copy"
              content={port}
              extraClassName="tooltip-right"/>
          </b>
        </span>
        <div className={style.trafficCount}>
          <span>
            <span className={style.trafficIcon}>⤓ </span>
            {connections.in.length}
            <span className={style.trafficIcon}> ⤒ </span>
            {connections.out.length}
          </span>
          <span className="none">
            <b>Total: {connections.in.length + connections.out.length}</b>
          </span>
        </div>
      </div>;
    })}
  </div>;
}

PortTrafficCell.propTypes = {
  node: PropTypes.object,
};

AddressCell.propTypes = {
  node: PropTypes.object,
};

TrafficCell.propTypes = {
  node: PropTypes.object,
};

PortsCell.propTypes = {
  node: PropTypes.object,
};

PortTraffic.propTypes = {
  ports: PropTypes.listOf(PropTypes.object),
};
