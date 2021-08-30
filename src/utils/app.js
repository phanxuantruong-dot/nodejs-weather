const request = require('request');
const promiseGeo = require('./utils/promiseGeo.js');
const promiseWeather = require('./utils/promiseWeather.js');
console.clear();

// app
// const consoleInput = process.argv[2];
// if (consoleInput) weatherOfPlace(consoleInput);
// if (!consoleInput)
//   console.log(`Please provide location (ex: "node app.js "cu chi"): `);

async function weatherOfPlace(place) {
  try {
    // get features from geo API
    const features = await promiseGeo(place);
    // extract the latitude and longitude
    const { center: latLong } = features;

    // get weather forecase from weather API
    const weatherForecast = await promiseWeather(latLong[0], latLong[1]);

    // console log for inform
    return `${features.place_name}, ${weatherForecast}`;
  } catch (err) {
    // if any error happen, log out the console
    return err;
  }
}

module.exports = weatherOfPlace;
//////
//////
