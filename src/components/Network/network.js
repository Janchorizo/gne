import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import render from './vis';
import style from './style.module.css';


/**
 * Interactive node-link diagram showing the network.
 * @param   {object} data The network.
 * @return {React.Component} A react component.
 */
export default function Network({data}) {
  if (data === null) {
    return '';
  }

  const svgRef = useRef();
  useEffect(
      () => {
        render(svgRef.current, data);
      }, // effect
      [svgRef.current, data]); //

  return <svg ref={svgRef} className={style.network}>
  </svg>;
}

Network.propTypes = {
  data: PropTypes.object,
};
