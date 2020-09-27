import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import render from './vis';
import handleFocus from './focus.js';
import style from './style.module.css';


/**
 * Interactive node-link diagram showing the network.
 * @param   {object} data The network.
 * @return {React.Component} A react component.
 */
export default function Network({data, focused, setFocused}) {
  if (data === null) {
    return '';
  }

  const svgRef = useRef();
  useEffect(
    () => {
      render(svgRef.current, data, setFocused);
    }, // effect
    [data]);

  useEffect(() => handleFocus(svgRef.current, focused), [focused]);

  return <svg ref={svgRef} className={style.network}>
  </svg>;
}

Network.propTypes = {
  data: PropTypes.object,
};
