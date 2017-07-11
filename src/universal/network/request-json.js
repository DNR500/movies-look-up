import httpRequest from './http-request';

export default function requestJSON(url) {
  return httpRequest(url,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json());
}
