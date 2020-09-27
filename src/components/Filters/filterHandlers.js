/**
 * Get handler for adding a filter.
 * @param  {list} filteredDimensions A list of currently filtered fimensions.
 * @param  {function} setFilteredDimensions Callback to set filters.
 * @param  {object} filters An object with the currently applied filters.
 * @param  {function} setFilters Callback to alter the applied filters.
 * @param  {object} fetched Object with the original network data.
 * @param  {function} setData Callback to set the filtered data.
 * @param  {function} setVisibile Callback to close the filter menu.
 */
export function getFilterAddHandler(
    filteredDimensions, setFilteredDimensions,
    filters, setFilters,
    fetched, setData,
    setVisibile,
) {
  /**
   * Event handler for adding a filter.
   * @param  {string} dim The affected dimension.
   * @param  {func} filterFunc Filter to be applied to network nodes.
   */
  return function handleFilterAdd(dim, filterFunc) {
    const newlyFiltered = [...new Set([...filteredDimensions, dim])];
    const newFilters = {...filters};
    const newData = {nodes: [], links: []};

    fetched.nodes.map((node) => {
      const filteredOut = !filterFunc(node);
      if (newFilters[node.address].includes(dim)) {
        if (filteredOut === false) {
          newFilters[node.address].splice(
              newFilters[node.address].indexOf(dim),
              1);
        }
      } else if (filteredOut === true) {
        newFilters[node.address].push(dim);
      }
    });

    newData.nodes =
      fetched.nodes.filter((node) => newFilters[node.address].length === 0);

    newData.links =
      fetched.links.filter((link) => (
        newFilters[link.source].length === 0 &&
        newFilters[link.target].length === 0));

    setFilteredDimensions(newlyFiltered);
    setFilters(newFilters);
    setData(newData);
    setVisibile(false);
  };
}

/**
 * Get handler for removing a filter.
 * @param  {list} filteredDimensions A list of currently filtered fimensions.
 * @param  {function} setFilteredDimensions Callback to set filters.
 * @param  {object} filters An object with the currently applied filters.
 * @param  {function} setFilters Callback to alter the applied filters.
 * @param  {object} fetched Object with the original network data.
 * @param  {function} setData Callback to set the filtered data.
 * @param  {function} setVisibile Callback to close the filter menu.
 */
export function getFilterRemoveHandler(
    filteredDimensions, setFilteredDimensions,
    filters, setFilters,
    fetched, setData,
    setVisibile,
) {
  /**
   * Event handler for removing a filter.
   * @param  {string} dim The affected dimension.
   */
  return function handleFilterRemove(dim) {
    const newlyFiltered = [...new Set([...filteredDimensions, dim])];
    const newFilters = {...filters};
    const newData = {nodes: [], links: []};

    fetched.nodes.map((node) => {
      if (newFilters[node.address].includes(dim)) {
        newFilters[node.address].splice(
            newFilters[node.address].indexOf(dim),
            1);
      }
    });

    newData.nodes =
      fetched.nodes.filter((node) => newFilters[node.address].length === 0);

    newData.links =
      fetched.links.filter((link) => (
        newFilters[link.source].length === 0 &&
        newFilters[link.target].length === 0));

    setFilteredDimensions(newlyFiltered);
    setFilters(newFilters);
    setData(newData);
    setVisibile(false);
  };
}
