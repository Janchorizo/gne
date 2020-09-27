import * as d3 from 'd3';

import * as selectors from './selectors.js';
import style from './style.module.css';


/**
   * Unfocus all but specified and connected links and nodes.
   * @param   {object} svg SVG DOM node.
   * @param   {string} focused Focused node address.
   */
export default function handleFocus(svg, focused) {
  const svgSelection = d3.select(svg);

  svgSelection // unfocus node
      .select('.'+style.focused)
      .classed(style.focused, false);

  svgSelection // restore nodes
      .selectAll('.'+selectors.genericNode)
      .classed(style.unfocused, false);

  svgSelection // restore links
      .selectAll('.'+selectors.genericLink)
      .classed(style.unfocused, false);

  if (focused !== null) {
    svgSelection // unfocus all nodes
        .selectAll('.'+selectors.genericNode)
        .classed(style.unfocused, true);

    svgSelection // focus node
        .select(selectors.netNodeIdSelector(focused))
        .classed(style.focused, true);

    svgSelection // unfocus all but connected links and nodes
        .selectAll('.'+selectors.genericLink)
        .each(function(d) {
          const selection =
            d3.select(this); // eslint-disable-line no-invalid-this
          const linked =
            selection.classed(selectors.linkIdentifier(focused)) === true;
          if (linked === true) {
            const linkedNode = d.source.address === focused ?
              selectors.netNodeIdSelector(d.target.address) :
              selectors.netNodeIdSelector(d.source.address);
            d3.select(linkedNode).classed(style.unfocused, false);
          } else {
            selection.classed(style.unfocused, true);
          }
        });
  }
}
