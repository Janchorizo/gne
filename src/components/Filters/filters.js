import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Menu from './menu.js';
import {getFilterAddHandler, getFilterRemoveHandler} from './filterHandlers';
import style from './style.module.css';


/**
 * Filter container.
 * @return {React.Component} A react component.
 */
export default function Filters({fetched, setData}) {
  if (fetched === null) {return '';}
  const [filteredDimensions, setFilteredDimensions] = useState([]);
  const [filters, setFilters] = useState({});
  const [adding, setAdding] = useState(false);

  const handleFilterAdd = getFilterAddHandler(
      filteredDimensions, setFilteredDimensions,
      filters, setFilters,
      fetched, setData,
      setAdding,
  );

  const handleFilterRemove = getFilterRemoveHandler(
      filteredDimensions, setFilteredDimensions,
      filters, setFilters,
      fetched, setData,
      setAdding,
  );

  const filterButtons = filteredDimensions.map((dim) =>
    <button
      className={style.removeButton}
      key={dim}
      onClick={() => handleFilterRemove(dim)}>
      {dim} <span className="mu mu-cancel"></span>
    </button>);

  useEffect(() => { // reset filters upon data fetch
    setFilteredDimensions([]);
    if (fetched !== null) {
      setFilters(Object.fromEntries(fetched.nodes.map((d) => [d.address, []])));
    }
    setData(fetched);
  }, [fetched]);

  const addButton = <button
    className={style.actionButton}
    onClick={() => setAdding(true)}>
    Add filter <span className="mu mu-plus"></span>
  </button>;
  const cancelButton = <button
    className={style.actionButton}
    onClick={() => setAdding(false)}>
    Cancel <span className="mu mu-cancel"></span>
  </button>;

  return <div className={style.filters}>
    {adding === false ? filterButtons : ''}
    {adding === false ? addButton : cancelButton}
    {adding === false ? '' : <Menu onAdd={handleFilterAdd}/>}
  </div>;
}

Filters.propTypes = {
  fetched: PropTypes.object,
  setData: PropTypes.func,
};
