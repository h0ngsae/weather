let input = document.getElementById("input");
let cityName = document.querySelectorAll(".city");
let dayDegree = document.querySelector(".degree");
let nightDegree = document.querySelector(".night-degree");
let date = document.querySelectorAll(".date");
let condition = document.querySelector(".condition");
let sun = document.getElementsByClassName("sun")[0];
let results = document.getElementById("results");

document.body.addEventListener("keyup", async () => {
  const response = await api(input.value);
  const array = response.features;
  results.innerHTML = "";
  for (item of array) {
    const res = await fetchWeather(item.center[1], item.center[0]);
    results.innerHTML += `<div id="locations">
      <p onclick='fetchWeather(${item.center[0]}, ${item.center[1]})'>${res.city.name}</p>
    </div>`;
  }
});

async function fetchWeather(latitude, longitude) {
  let forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=1&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`
  );
  const fetchWeather = await forecast.json();
  console.log(fetchWeather);
  for(let i = 0; i < cityName.length; i++){
    cityName[i].innerText = fetchWeather.city.name;
  }
  dayDegree.innerHTML = Math.floor(Number(fetchWeather.list[0].temp.day)) + `°`;
  nightDegree.innerHTML =
    Math.floor(Number(fetchWeather.list[0].temp.night)) + `°`;
  condition.innerHTML = fetchWeather.list[0].weather[0].main;
  let icon = fetchWeather.list[0].weather[0].icon;
  sun.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return fetchWeather;
}

async function api(value) {
  let location = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoidHVydXV1dSIsImEiOiJjbDBhZW15ZHAwMGhjM2RtZjB6dnltZnhjIn0.HSb4dmJFSM2USxDkTsScDg`
  );
  const locationData = await location.json();
  return locationData;
}

for (let i = 0; i < date.length; i++) {
  date[i].innerHTML = new Date().toDateString();
}
