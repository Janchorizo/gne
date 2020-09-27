const apiUrl = __STAGE__ === 'prod' ?
  'https://gne-conversion-api.herokuapp.com/parse' :
  'http://localhost:5000/parse';

/**
 * Fetches the processed network for a given file and configuration.
 * @param   {File} file The SVG file.
 * @param   {list} nodeConf List of property configurations for the nodes.
 * @param   {list} linkConf List of property configurations for the links.
 * @return  {Promise} A Promise for the JSON-formated data.
 */
export default {parse: function apiParse(file, nodeConf, linkConf) {
  const form = new FormData();
  form.append('node', nodeConf);
  form.append('link', linkConf);
  form.append('doc', file, file.filename);

  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      'method': 'POST',
      'body': form,
    })
        .then((response) => {
          response.json().then((json) => resolve(json));
        })
        .catch((err) => {
          reject(err);
        });
  });
}};
