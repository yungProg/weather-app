import "./style.css";
import homepage from "./homepage.js";

// function getWeatherData(location) {
//     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=ZAZMAPDL2FBRGHTF37JH736D8&contentType=json`)
//     .then(resolve => resolve.json())
//     .then(resolve => console.log(resolve))
// }
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.querySelector(".search-field").value;
  homepage().homepageUpdater(city);
  homepage().build();
});
