const urlBase = 'http://localhost:4000/api';

export function api (service, body){
    return    fetch(
        `${urlBase}/${service}`,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
};