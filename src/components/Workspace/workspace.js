import React from 'react';
import PropTypes from 'prop-types';

import {DataTable} from 'components';
import style from './style.module.css';


export default function Workspace({data}) {
  return <div className={style.workspace}>
    <div></div>
    <DataTable data={data}/>
  </div>
}

Workspace.propTypes = {
  data: PropTypes.object
};