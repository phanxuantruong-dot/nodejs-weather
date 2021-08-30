const request = require('request');

// take long lat as array, return a string to console.log about the weather
function promiseWeather(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=0f9cfac6f02b763c05bb2ce95ac9ac9c&query=${longitude},${latitude}`;

    //Weather API, console log the weather of certain location
    request({ url: weatherUrl, json: true }, (error, respone) => {
      if (error) {
        reject(`Cant connect with weatherstack server!`);
      } else if (respone.body.error) {
        reject(respone.body.error.info);
      } else {
        const { current } = respone.body;
        resolve(
          `${current.weather_descriptions[0]}, it is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
        );
      }
    });
  });
}

module.exports = promiseWeather;
