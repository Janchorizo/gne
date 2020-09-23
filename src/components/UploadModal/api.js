const apiUrl = '__STAGE__' === 'prod'
  ? "https://gne-conversion-api.herokuapp.com/parse"
  : "http://localhost:5000/parse";

export default function apiParse(file, nodeConf, linkConf) {
  const form = new FormData();
  form.append('node', nodeConf);
  form.append('link', linkConf);
  form.append('doc', file, file.filename);

  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      "method": "POST",
      body: form
    })
    .then(response => {
      response.json().then(json => resolve(json))
    })
    .catch(err => {
      reject(err);
    });
        
  });
}
