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

function getRemoteCharts(params = {}) {
  const { baseUrl } = config;
  const weekMilliSeconds = +(new Date()) - 7 * 24 * 60 * 60 * 1000;
  // const { date_to = formatDate(), date_from = formatDate(new Date(weekMilliSeconds)) } = params;
  const { date_to = `2018-04-01`, date_from = `2018-02-01` } = params;

  let query = `c/?project_id=52&offset=0&limit=9999999&date_from=${date_from}&date_to=${date_to}&format=json`;

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

  console.log(`${baseUrl}/${query}`)
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${query}`, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data)
        resolve(data);
      })
      .catch(error => {
        // console.log(error)

        reject(error)
      })
  })
}


function getData(query = `/sources/stat/sources`, params = {}) {
  const { baseUrl } = config;
  const weekMilliSeconds = +(new Date()) - 7 * 24 * 60 * 60 * 1000;

  let header = new Headers({
    'Access-Control-Allow-Origin':'*',
  });

  let options={
    method: 'GET',
    mode: 'cors',
    headers: header,
    credentials: 'include'
  };

  const newParams = {
    project_id: 52,
    offset: 0,
    limit: 9999999,
    date_from: formatDate(new Date(weekMilliSeconds)),
    date_to: formatDate(),
    format: `json`,
  }
  let queryParams = `?`;
  for (const key in newParams) {
    if (newParams.hasOwnProperty(key)) {
      queryParams += `${key}=${newParams[key]}&`
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${`https://ae.alytics.ru`}${query}/${queryParams}`, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)

        resolve(data);
      })
      .catch(error => {
        console.log(error)

        reject(error)
      })
  })
}

export default {
  getRemoteData,
  getRemoteCharts,
  getData,
}
