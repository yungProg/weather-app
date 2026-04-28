import "./style.css";
import homepage from "./homepage.js";

// function getWeatherData(location) {
//     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=ZAZMAPDL2FBRGHTF37JH736D8&contentType=json`)
//     .then(resolve => resolve.json())
//     .then(resolve => console.log(resolve))
// }

async function requestWeatherData(location) {}

async function getRelevantData(location) {
  const dataObj = await requestWeatherData(location);
  console.log(dataObj);
}
homepage().build();
homepage().homepageUpdater();
// getRelevantData("kumasi")
// requestWeatherData("kumasi")
