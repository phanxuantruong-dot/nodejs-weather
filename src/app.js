const path = require('path');
const request = require('request');
const promiseGeo = require('./utils/promiseGeo.js');
const promiseWeather = require('./utils/promiseWeather.js');
const hbs = require('hbs');

// express initial
const express = require('express');
const app = express();

// path initial
const publicFolderPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting up handle bars
app.set(`view engine`, `hbs`);
app.set(`views`, viewsPath);
hbs.registerPartials(partialsPath);

// static html
app.use(express.static(publicFolderPath));

// res.send to web server
app.get('', (req, res) => {
  res.render('index', {
    title: `Weather App`,
    description: `Use this page to view weather`,
    name: `Truong`,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: `This is about page`,
    description: `This is a short description on about page`,
    name: `Truong`,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: `This is Help page`,
    description: `This is a short description on help page`,
    name: `Truong`,
  });
});

app.get(`/products`, (req, res) => {
  if (!req.query.search) {
    return res.send({ error: `You must provide a search term` });
  }

  res.send({
    products: [],
  });
  console.log(req.query);
});

app.get(`/weather`, (req, res) => {
  const locationRequest = req.query.location;
  if (!locationRequest) {
    return res.send({ error: `You must provide a location` });
  }

  (async function weatherOfPlace(place) {
    try {
      // get features from geo API
      const features = await promiseGeo(place);
      // extract the latitude and longitude
      const { center: latLong } = features;

      // get weather forecase from weather API
      const weatherForecast = await promiseWeather(latLong[0], latLong[1]);

      // res.send for inform
      return res.send({
        location: features.place_name,
        forecast: weatherForecast,
      });
    } catch (err) {
      // if any error happen, log out the console
      return res.send({
        error: err,
      });
    }
  })(req.query.location);
});

app.get('/help/*', (req, res) => {
  res.render(`404`, {
    title: `Help article not found`,
    name: `Truong`,
  });
});

app.get('*', (req, res) => {
  res.render(`404`, {
    title: `Page not found`,
    name: `Truong`,
  });
});

// app.com
// app.com/help (the /help is in the `` of app.get(``,))

// create a server on port 3000 and console.log
app.listen(3000, () => {
  console.log(`Sever is up on port 3000.`);
});
