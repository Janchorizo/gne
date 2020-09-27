import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


/**
 * Filter container.
 * @return {React.Component} A react component.
 */
export default function Filters({fetched, setData}) {
  const [filteredDimensions, setFilteredDimensions] = useState([]);
  const [filters, setFilters] = useState({});
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setFilteredDimensions([]);
    if (fetched !== null) {
      setFilters(Object.fromEntries(fetched.nodes.map(d => [d.address, []])));
    }
    setData(fetched);
  }, [fetched]);

  const addButton = <button onClick={() => setAdding(true)}>
    Add filter <span className="mu mu-plus"></span>
    </button>;
  const cancelButton = <button onClick={() => setAdding(false)}>
    Cancel <span className="mu mu-cancel"></span>
    </button>;

  return <div className={style.filters}>
    {adding === false ? addButton : cancelButton}
  </div>;
}

Filters.propTypes = {
  fetched: PropTypes.object,
  setData: PropTypes.func,
};
