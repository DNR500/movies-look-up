import 'isomorphic-fetch';

export default function httpRequest(url, options = {}, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const errorMessage = `timeout http request
       - url:${url} 
       - options: ${JSON.stringify(options)}
       - waited: ${timeout}ms`;

      reject(new Error(errorMessage));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(error => reject(error));
  });
}
