import React from 'react';
import PropTypes from 'prop-types';

import {DataTable, Network} from 'components';
import style from './style.module.css';


/**
 * Layout component for the network and data table.
 * @param   {object} data Retrieved data from the API.
 * @return  {React.Component} A React component
 */
export default function Workspace({data, focused, setFocused}) {
  return <div className={style.workspace}>
    <div className={style.networkContainer}>
      <Network {...{data, focused, setFocused}}/>
    </div>
    <div className={style.tableContainer}>
      <DataTable {...{data, focused, setFocused}}/>
    </div>
  </div>;
}

Workspace.propTypes = {
  data: PropTypes.object,
};
