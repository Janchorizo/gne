import * as d3Legend from 'd3-svg-legend';
import * as _d3 from 'd3';
const d3 = Object.assign({}, _d3, d3Legend);

import * as selectors from './selectors.js';
import style from './style.module.css';


const clampMargin = 20; // with respect to <svg> dimensions
const [minLinkWidth, maxLinkWidth] = [1, 6];
const forceStrengths = {
  charge: -35,
  collide: 50,
  center: .1,
  link: .8,
};

/**
 * Render an interactive node-link diagram.
 * @param   {DOMNode} svg The DOM svg node.
 * @param   {object} data The network.
 * @param   {function} setFocused Callback to set the focused node.
 */
export default function render(svg, data, setFocused) {
  const {width, height} = svg.getBoundingClientRect();

  renderLegend(svg, data.links);
  const links = renderLinks(svg, data.links);
  const nodes = renderNodes(svg, data.nodes);
  const simulation = setupSimulation(width, height, nodes, links, data);
  setupInteraction(width, height, nodes, simulation, setFocused);
}

/**
 * Setup focus change for hover interactions.
 * @param   {int} width SVG node width.
 * @param   {int} height SVG node height.
 * @param   {d3.selection} nodes Nodes selection
 * @param   {object} simulation The d3 force simulation.
 * @param   {function} setFocused Callback to set the focused node.
 */
function setupInteraction(width, height, nodes, simulation, setFocused) {
  /**
   * Handle node click interaction.
   * @param   {object} event The event.
   * @param   {any} d Node data.
   */
  function click(event, d) {
    delete d.fx;
    delete d.fy;
    d3.select(this) // eslint-disable-line no-invalid-this
        .classed(style.fixed, false);
    simulation.alpha(1).restart();
  }

  /**
   * Handle node drag start interaction.
   */
  function dragstart() {
    d3.select(this) // eslint-disable-line no-invalid-this
        .classed(style.fixed, true);
  }

  /**
   * Handle node drag interaction.
   * @param   {object} event The event.
   * @param   {any} d Node data.
   */
  function dragged(event, d) {
    d.fx = clamp(event.x, clampMargin, width - clampMargin);
    d.fy = clamp(event.y, clampMargin, height - clampMargin);
    simulation.alpha(1).restart();
  }

  nodes
      .call(d3.drag()
          .on('start', dragstart)
          .on('drag', dragged))
      .on('click', click)
      .on('mouseenter', (e, d) => setFocused(d.address))
      .on('mouseleave', (d) => setFocused(null));
}

/**
 * Setup and start the force simulation for node placement.
 * @param   {int} width SVG node width.
 * @param   {int} height SVG node height.
 * @param   {d3.selection} nodes Nodes selection
 * @param   {d3.selection} links Links selection
 * @param   {object} data The network.
 * @return  {object} The d3 force simulation
 */
function setupSimulation(width, height, nodes, links, data) {
  const simulation = d3.forceSimulation();

  simulation.nodes(data.nodes).on('tick', () => {
    nodes.attr('transform', (node) =>{
      node.x = clamp(node.x, clampMargin, width - clampMargin);
      node.y = clamp(node.y, clampMargin, height - clampMargin);
      return `translate(${node.x}, ${node.y})`;
    });
    links
        .attr('x1', (link) => link.source.x + (link.source.address.length * 6))
        .attr('y1', (link) => link.source.y)
        .attr('x2', (link) => link.target.x + (link.target.address.length * 6))
        .attr('y2', (link) => link.target.y);
  });

  const forces = {
    charge: d3.forceManyBody().strength(forceStrengths.charge),
    collide: d3.forceCollide(forceStrengths.collide),
    center: d3.forceCenter(width/2, height/2).strength(forceStrengths.center),
    link: d3.forceLink(data.links)
        .id((d) => d.address).distance(95).strength(forceStrengths.link),
  };
  Object.entries(forces)
      .forEach(([name, force]) => simulation.force(name, force));

  simulation.tick();
  return simulation;
}

/**
 * Render nodes.
 * @param   {DOMNode} svg The DOM svg node.
 * @param   {object} nodes The network data for network nodes.
 * @return  {d3.selection} The nodes d3 selection.
 */
function renderNodes(svg, nodes) {
  let nodesG = d3.select(svg)
      .selectAll('g.'+selectors.genericNode)
      .remove();
  nodesG = d3.select(svg)
      .selectAll('g.'+selectors.genericNode)
      .data(nodes)
      .enter()
      .append('g')
      .attr('id', (d) => selectors.nodeIdentifier(d.address))
      .classed(selectors.genericNode, true)
      .each(function(d) {
        d3.select(this).append('rect'); // eslint-disable-line no-invalid-this
        d3.select(this).append('text'); // eslint-disable-line no-invalid-this
      });
  nodesG
      .each(function(d) {
        d3.select(this).select('rect') // eslint-disable-line no-invalid-this
            .attr('x', -15)
            .attr('y', -15)
            .attr('width', d.address.length * 12)
            .attr('height', 30)
            .attr('rx', 15);
        d3.select(this).select('text') // eslint-disable-line no-invalid-this
            .text(d.address);
      });

  return nodesG;
}

/**
 * Render links. [TODO: Convert to g to hold port numbers and arrow]
 * @param   {DOMNode} svg The DOM svg node.
 * @param   {object} links The network data for network links.
 * @return  {d3.selection} The links d3 selection.
 */
function renderLinks(svg, links) {
  const maxCount = Math.max(...links.map((d) => d.count));
  const lineSize = d3.scaleLinear()
      .domain([0, maxCount])
      .range([minLinkWidth, maxLinkWidth]);

  let linksG = d3.select(svg)
      .selectAll('line.'+selectors.genericLink)
      .data(links);
  linksG.exit().remove();
  linksG.enter().append('line')
      .classed(selectors.genericLink, true)
      .each(function(d) {
        d3.select(this) // eslint-disable-line no-invalid-this
            .classed(selectors.linkIdentifier(d.source), true)
            .classed(selectors.linkIdentifier(d.target), true);
      });
  linksG = d3.select(svg).selectAll('line.'+selectors.genericLink)
      .attr('stroke-width', (d) => lineSize(d.count));

  return linksG;
}

/**
 * Render link stroke width legend.
 * @param   {DOMNode} svg The DOM svg node.
 * @param   {object} links The network data for network links.
 */
function renderLegend(svg, links) {
  const maxCount = Math.max(...links.map((d) => d.count));
  const lineSize = d3.scaleLinear()
      .domain([0, maxCount])
      .range([minLinkWidth, maxLinkWidth]);

  const legendSizeLine = d3.legendSize()
      .scale(lineSize)
      .shape('line')
      .orient('horizontal')
      .labelWrap(30)
      .shapeWidth(40)
      .labelAlign('middle')
      .shapePadding(10);

  d3.select(svg).select('#legend')
      .attr('transform', 'translate(20, 20)')
      .call(legendSizeLine)
      .selectAll('.cell')
      .each(function(d) {
        d3.select(this) // eslint-disable-line no-invalid-this
            .select('line')
            .attr('stroke', 'var(--secondary)');
        d3.select(this) // eslint-disable-line no-invalid-this
            .select('text')
            .attr('fill', 'var(--on-surface)');
      });
}

const clamp = (x, lo, hi) => Math.max(lo, Math.min(x, hi));
