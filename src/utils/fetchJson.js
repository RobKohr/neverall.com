export default function fetchJson(url, options = {}) {
  const fetchOptions = { ...options };
  if (options.bodyObj) fetchOptions.body = JSON.stringify(options.bodyObj);
  return fetch(url, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
}
