// const res = fetchData();
const input = document.querySelector(`.input`);
const btn = document.querySelector(`.btn`);
const form = document.querySelector(`form`);
const respone = document.querySelector(`.response`);

form.addEventListener(`submit`, e => {
  e.preventDefault();
  const location = input.value.split(` `).join(`_`);
  fetchData(location);
  input.value = '';
});

async function fetchData(location) {
  const url = `http://localhost:3000/weather?location=${location}`;
  respone.innerHTML = `Loading...`;
  const data = await fetch(url);
  const dataJSON = await data.json();

  if (!dataJSON.error)
    respone.innerHTML = `Location: ${dataJSON.location} has ${dataJSON.forecast}`;
  if (dataJSON.error) respone.innerHTML = dataJSON.error;
}
