import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {ClipboardCopy} from 'common/components';
import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';

export function PortTrafficCell({node}) {
  const portIsUsed = port => port.in.length + port.out.length >0;
  const usedPorts = Object.entries(node.ports).filter(p => portIsUsed(p[1]));
  return(
    <td className={style.portTrafficCell}>
        <PortTraffic ports={usedPorts}/>
    </td>);
}

export function AddressCell({node}) {
  return(
    <td className={style.addressCell}>
      <b>
        {node.address}
        <ClipboardCopy msg="Click to copy" content={node.address}/>
      </b>
      <span className={style.addressType}>{node.type}</span>
    </td>);
}

export function TrafficCell({node}) {
  const [inByPortConnections, outByPortConnections] = [
    Object.values(node.ports).reduce((ac, dc) => ac + dc.in.length, 0),
    Object.values(node.ports).reduce((ac, dc) => ac + dc.out.length, 0)
  ];
  const incoming = node.in.length + inByPortConnections;
  const outgoing = node.out.length + outByPortConnections;
  return(
    <td className={style.trafficCell}>
      In: {incoming}<br/>
      Out: {outgoing}<br/>
      <b>Total: {incoming + outgoing}</b>
    </td>);
}

export function PortsCell({node}) {
  return(
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

function PortTraffic({ports}) {
  return <div className={style.portTraffic}>
    {ports.map(([port, connections]) => {
      return <div key={port} className={style.portContainer}>
        <span className={style.portName}><b>{port}</b></span>
        <div className={style.trafficCount}>
          <span>In: {connections.in.length}</span>
          <span>Out: {connections.out.length}</span>
          <span>
            <b>Total: {connections.in.length + connections.out.length}</b>
          </span>
        </div>
      </div>
    })}
  </div>
}