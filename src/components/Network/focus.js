import * as d3 from 'd3';

import address2class from './format.js';
import style from './style.module.css';


export default function handleFocus(svg, focused) {
  const svgSelection = d3.select(svg);
  svgSelection.select('.'+style.focused).classed(style.focused, false);
  svgSelection.selectAll('.'+style.node).classed(style.unfocused, false);
  svgSelection.selectAll('.'+style.link).classed(style.unfocused, false);
  if (focused !== null) {
    const id = '#' + address2class('netNode', focused);
    svgSelection.selectAll('.'+style.node).classed(style.unfocused, true);
    svgSelection.selectAll('.'+style.link).each(function(d){
      const selection = d3.select(this);
      const linked =
        selection.classed(address2class('netLink', focused)) === true;
      if (linked === true) {
        const linkedNode = d.source.address === focused
          ? '#' + address2class('netNode', d.target.address)
          : '#' + address2class('netNode', d.source.address);
          d3.select(linkedNode).classed(style.unfocused, false);
      } else {
        selection.classed(style.unfocused, true)
      }
    });
    svgSelection.select(id).classed(style.focused, true);
  }
}