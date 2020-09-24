import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

function PortTraffic({ports}) {
  return <div className={style.portTraffic}>
    {Object.entries(ports).map(([port, connections]) => {
      return <div key={port} className={style.portContainer}>
        <span className={style.portName}>{port}</span>
        <div className={style.trafficCount}>
          <span>In: {connections.in.length}</span>
          <span>Out: {connections.out.length}</span>
          <span>Total: {connections.in.length + connections.out.length}</span>
        </div>
      </div>
    })}
  </div>
}

export default function Preview({data}) {
  if (data === null) {
    return '';
  }

  const [expanded, setExpanded] = useState(false);

  const previewCssClasses = [
    style.preview,
  ].join(',');

  const rows = data.nodes.map((d) => {
    const [inByPortConnections, outByPortConnections] = [
      Object.values(d.ports).reduce((ac, dc) => ac + dc.in.length, 0),
      Object.values(d.ports).reduce((ac, dc) => ac + dc.out.length, 0)
    ];
    return <tr key={d.address}>
      <td>
        <div className={style.portContainer}>
          {Object.keys(d.ports).map((p) => <div key={p} title={p} className={style.port}></div>)}
        </div>
      </td>
      <td>{d.address}</td>
      <td>{d.type}</td>
      <td>
        In: {d.in.length + inByPortConnections}<br/>
        Out: {d.out.length + outByPortConnections}<br/>
        Total: {d.in.length + inByPortConnections + d.out.length + outByPortConnections}
      </td>
      <td>
        <PortTraffic ports={d.ports}/>
      </td>
    </tr>
  });

  return <div className={previewCssClasses}>
    <table className={expanded === false ? style.collapsed : "primary " + style.expanded}>
      <thead>
        <tr>
          {expanded === false
            ? <th
                className={style.toggle}
                onClick={()=> setExpanded(true)}
                colSpan="5">
                  <button>❰ Expand table</button>
              </th>
            : <th
                className={style.toggle}
                onClick={()=> setExpanded(false)}
                colSpan="5">
                  <button>Collapse table ❱</button>
              </th>
          }
        </tr>
        <tr>
          <th>Ports</th>
          <th>Address</th>
          <th>Address Type</th>
          <th>Degree</th>
          <th>Port Traffic</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>;
}

Preview.propTypes = {
  data: PropTypes.object,
};
