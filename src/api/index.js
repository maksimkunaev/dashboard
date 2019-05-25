import config from '../config';

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  console.log(day.length)
  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
}

function getRemoteData(params = {}) {
  const { baseUrl } = config;
  const weekMilliSeconds = +(new Date()) - 7 * 24 * 60 * 60 * 1000;
  // const { date_to = formatDate(), date_from = formatDate(new Date(weekMilliSeconds)) } = params;
  const { date_to = `2018-01-01`, date_from = `2017-02-01` } = params;

  let query = `sources/stat/sources/?project_id=52&offset=0&limit=9999999&date_from=${date_from}&date_to=${date_to}&format=json`;

  document.cookie = `access_token=${config.access_token}`;

  let header = new Headers({
    'Access-Control-Allow-Origin':'*',
  });

  let options={
    method: 'GET',
    mode: 'cors',
    headers: header,
    credentials: 'include'
  };

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${query}`, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  getRemoteData,
}
