const request = require('request');

// take placement as string, return lat long as 1x2 array [lat,long] => put that lat long to weather to get the weather forecast
function promiseGeo(place) {
  return new Promise((resolve, reject) => {
    const geoPlace = encodeURIComponent(place);
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geoPlace}.json?access_token=pk.eyJ1IjoicGhhbnh1YW50cnVvbmcwMzA4MTk5NCIsImEiOiJja3NxdGc2c2QwM2huMnZtcWpoODNpMzRiIn0.NMr2EMYCyLqok36HflFIGQ&limit=1`;

    //Geocoding, get the location => Address => Lat/Long -> Weather
    request({ url: geoUrl, json: true }, (error, respone) => {
      if (error) {
        reject(`Cant connect with mapbox server!`);
      } else if (respone.body.features?.length === 0 || respone.body.message) {
        reject(`Can't find the location`);
      } else {
        const { features } = respone.body;
        const [longitude, latitude] = features[0].center;
        resolve(features[0]);
      }
    });
  });
}

module.exports = promiseGeo;
