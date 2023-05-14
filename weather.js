const apiKey = "078ybYKFxTp7ANE3WAvJ5C7c2tiCZYi1";
const form = document.querySelector("form");
const locationInput = document.querySelector("#location");
const apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=`;

form.addEventListener("submit", event => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (location.length === 0) return;
  fetch(apiUrl + location)
    .then(response => response.json())
    .then(data => {
      const locationKey = data[0].Key;
      const currentConditionsUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
      return fetch(currentConditionsUrl);
    })
    .then(response => response.json())
    .then(data => {
      const temperature = data[0].Temperature.Imperial.Value;
      const weatherText = data[0].WeatherText;
      const icon = data[0].WeatherIcon;
      const weatherHtml = `
        <p>Temperature: ${temperature}°F</p>
        <p>Weather: ${weatherText}</p>
        <img src="https://developer.accuweather.com/sites/default/files/${icon < 10 ? "0" : ""}${icon}-s.png" alt="Weather Icon">
      `;
      document.querySelector("#weather").innerHTML = weatherHtml;
    })
    .catch(error => console.log(error));
});
