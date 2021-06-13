export default function fetchJson(url, options = {}) {
  if (options.bodyObj) options.body = JSON.stringify(options.bodyObj);
  return fetch(url, options)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
}
