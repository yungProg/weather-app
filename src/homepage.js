export default function homepage() {
  const mainSection = document.querySelector(".main");
  const asideSection = document.querySelector(".aside");

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=ZAZMAPDL2FBRGHTF37JH736D8&contentType=json`,
      );
      if (!response.ok) {
        throw new Error("Couldn't retrieve data");
      } else {
        const result = await response.json();
        // console.log(result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const homepageUpdater = async () => {
    const data = await fetchWeatherData("Kumasi");
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const needed = {
      city: data.resolvedAddress,
      weatherDescription: data.description,
      temperature: data.currentConditions.temp,
      weatherIcon: data.currentConditions.icon,
      nextHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 1].temp,
        // maxTemperature,
      },
      nextTwoHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 2].temp,
        // maxTemperature,
      },
      nextThreeHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 3].temp,
        // maxTemperature,
      },
      nextFourHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 4].temp,
        // maxTemperature,
      },
      nextFiveHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 5].temp,
        // maxTemperature,
      },
      nextSixHour: {
        minTemperature: data.days[2].hours[new Date().getHours() + 6].temp,
        // maxTemperature,
      },
      feelsLike: data.currentConditions.feelslike,
      uvIndex: data.currentConditions.uvindex,
      rainProbability: data.currentConditions.precipprob,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      pressure: data.currentConditions.pressure,
      sunset: data.currentConditions.sunset,
      nextDay: {
        day: daysOfWeek[(new Date().getDay() + 1) % 7],
        weatherName: data.days[3].icon,
        minTemperature: data.days[3].tempmin,
        maxTemperature: data.days[3].tempmax,
      },
      nextTwoDay: {
        day: daysOfWeek[(new Date().getDay() + 2) % 7],
        weatherName: data.days[4].icon,
        minTemperature: data.days[4].tempmin,
        maxTemperature: data.days[4].tempmax,
      },
      nextThreeDay: {
        day: daysOfWeek[(new Date().getDay() + 3) % 7],
        weatherName: data.days[5].icon,
        minTemperature: data.days[5].tempmin,
        maxTemperature: data.days[5].tempmax,
      },
      nextFourDay: {
        day: daysOfWeek[(new Date().getDay() + 4) % 7],
        weatherName: data.days[6].icon,
        minTemperature: data.days[6].tempmin,
        maxTemperature: data.days[6].tempmax,
      },
      nextFiveDay: {
        day: daysOfWeek[(new Date().getDay() + 5) % 7],
        weatherName: data.days[7].icon,
        minTemperature: data.days[7].tempmin,
        maxTemperature: data.days[7].tempmax,
      },
      nextSixDay: {
        day: daysOfWeek[(new Date().getDay() + 6) % 7],
        weatherName: data.days[8].icon,
        minTemperature: data.days[8].tempmin,
        maxTemperature: data.days[8].tempmax,
      },
      nextSevenDay: {
        day: daysOfWeek[(new Date().getDay() + 7) % 7],
        weatherName: data.days[9].icon,
        minTemperature: data.days[9].tempmin,
        maxTemperature: data.days[9].tempmax,
      },
    };
    console.log(needed);

    document.querySelector(".city").textContent = needed.city;
    document.querySelector(".description").textContent =
      needed.weatherDescription;
    document.querySelector(".temperature").textContent =
      `${needed.temperature} °F`;
    document.querySelector(".weather-img").textContent = needed.weatherIcon;
  };

  const build = () => {
    const homepageMainTemplate = document.getElementById("homepage-main-temp");
    const homepageMainClone = homepageMainTemplate.content.cloneNode(true);
    mainSection.appendChild(homepageMainClone);

    const homepageAsideTemplate = document.getElementById(
      "homepage-aside-template",
    );
    const homepageAsideClone = homepageAsideTemplate.content.cloneNode(true);
    asideSection.appendChild(homepageAsideClone);
  };
  return { homepageUpdater, build };
}
