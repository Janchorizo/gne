import React from 'react';
import PropTypes from 'prop-types';

import {DataTable} from 'components';
import style from './style.module.css';


export default function Workspace({data}) {
  return <div className={style.workspace}>
    <div></div>
    <div className={style.tableContainer}>
      <DataTable data={data}/>
    </div>
  </div>;
}

Workspace.propTypes = {
  data: PropTypes.object,
};
