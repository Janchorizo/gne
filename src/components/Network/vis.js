import * as d3 from 'd3';

import style from './style.module.css';


/**
 * Render an interactive node-link diagram.
 * @param   {DOMNode} svg The DOM svg node.
 * @param   {object} data The network.
 */
export default function render(svg, data) {
  const {width, height} = svg.getBoundingClientRect();
  const simulation = d3.forceSimulation()
  .tick()
  .force('charge', d3.forceManyBody().strength(-35))
  .force("collide", d3.forceCollide(50))
  .force('center', d3.forceCenter(width / 2, height / 2).strength(0.15))
  

  const links = renderLinks(svg, data.links);
  const nodes = renderNodes(svg, data.nodes, width, height, simulation);
  simulation.nodes(data.nodes).on('tick', () => {
    nodes.attr('transform', node =>{
      node.x = clamp(node.x, 0, width);
      node.y = clamp(node.y, 0, height);
      return `translate(${node.x}, ${node.y})`
    });
    links
      .attr('x1', link => link.source.x)
      .attr('y1', link => link.source.y)
      .attr('x2', link => link.target.x)
      .attr('y2', link => link.target.y)
  });
  const linkForce = d3.forceLink(data.links)
    .id(d => d.address)
    .distance(95)
    .strength(0.8)
  simulation.force('link',linkForce)
}

function renderNodes(svg, nodes, width, height, simulation) {
  function click(event, d) {
    delete d.fx;
    delete d.fy;
    d3.select(this).classed(style.fixed, false);
    simulation.alpha(1).restart();
  }
  
  function dragstart() {
    d3.select(this).classed(style.fixed, true);
  }
  
  function dragged(event, d) {
    d.fx = clamp(event.x, 0, width);
    d.fy = clamp(event.y, 0, height);
    simulation.alpha(1).restart();
  }

  d3.select(svg).selectAll('g.node')
    .data(nodes)
    .enter()
      .append('g')
      .classed('node', true)
      .classed(style.nodeAddress, true)
      .each(function (d) {
        d3.select(this).append('rect');
        d3.select(this).append('text');
      });
  const nodesG = d3.select(svg).selectAll('g.node')  
    .each(function(d) {
      d3.select(this).select('rect')
        .attr('x', -15)
        .attr('y', -15)
        .attr('width', d.address.length * 12)
        .attr('height', 30)
        .attr('stroke', 'var(--primary)');
      d3.select(this).select('text')
        .text(d.address)
        .attr('fill', 'var(--primary)');
    })
    .call(d3.drag()
      .on("start", dragstart)
      .on("drag", dragged))
    .on('click', click)
  return nodesG;
}

function renderLinks(svg, links) {
  d3.select(svg).selectAll('line.link')
  .data(links)
  .enter().append('line')
    .classed('link', true)
    .classed(style.link, true)
  const linksG = d3.select(svg).selectAll('line.link');

  return linksG;
}

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}