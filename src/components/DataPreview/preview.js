import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';

export default function Preview({data}) {
  if (data === null) {
    return '';
  }

  const previewCssClasses = [
    style.preview,
  ].join(',');

  const rows = data.nodes.map((d) => <tr key={d.address}>
    <td>
      <div className={style.portContainer}>
        {Object.keys(d.ports).map((p) => <div key={p} title={p} className={style.port}></div>)}
      </div>
    </td>
    <td>{d.address}</td>
  </tr>);

  return <div className={previewCssClasses}>
    <table className="primary">
      <thead>
        <tr>
          <th>Ports</th>
          <th>Address</th>
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
