export default function homepage() {
  const mainContent = document.querySelector(".content");
  const asideSection = document.querySelector(".aside");
  const tempUnit = "°F";

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=ZAZMAPDL2FBRGHTF37JH736D8&contentType=json`,
      );
      if (!response.ok) {
        mainContent.textContent = "hey";
      } else {
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const homepageUpdater = async (location) => {
    [mainContent.textContent, asideSection.textContent] = "";
    const data = await fetchWeatherData(location);
    console.log("data", data);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    const temperatures = {
      currentTemperature: data.currentConditions.temp,
      nextHourMinTemperature: getHoursMinTemperature(data, 1, "one"),
      nextTwoHourMinTemperature: getHoursMinTemperature(data, 2, "two"),
      nextThreeHourMinTemperature: getHoursMinTemperature(data, 3, "three"),
      nextFourHourMinTemperature: getHoursMinTemperature(data, 4, "four"),
      nextFiveHourMinTemperature: getHoursMinTemperature(data, 5, "five"),
      nextSixHourMinTemperature: getHoursMinTemperature(data, 6, "six"),
      feelsLike: data.currentConditions.feelslike,
      nextDayMinTemperature: data.days[3].tempmin,
      nextDayMaxTemperature: data.days[3].tempmax,
      nextTwoDayMinTemperature: data.days[4].tempmin,
      nextTwoDayMaxTemperature: data.days[4].tempmax,
      nextThreeDayMinTemperature: data.days[5].tempmin,
      nextThreeDayMaxTemperature: data.days[5].tempmax,
      nextFourDayMinTemperature: data.days[6].tempmin,
      nextFourDayMaxTemperature: data.days[6].tempmax,
      nextFiveDayMinTemperature: data.days[7].tempmin,
      nextFiveDayMaxTemperature: data.days[7].tempmax,
      nextSixDayMinTemperature: data.days[8].tempmin,
      nextSixDayMaxTemperature: data.days[8].tempmax,
      nextSevenDayMinTemperature: data.days[9].tempmin,
      nextSevenDayMaxTemperature: data.days[9].tempmax,
    };

    const days = {
      nextDay: daysOfWeek[(new Date().getDay() + 1) % 7],
      nextTwoDay: daysOfWeek[(new Date().getDay() + 2) % 7],
      nextThreeDay: daysOfWeek[(new Date().getDay() + 3) % 7],
      nextFourDay: daysOfWeek[(new Date().getDay() + 4) % 7],
      nextFiveDay: daysOfWeek[(new Date().getDay() + 5) % 7],
      nextSixDay: daysOfWeek[(new Date().getDay() + 6) % 7],
      nextSevenDay: daysOfWeek[(new Date().getDay() + 7) % 7],
    };

    const weatherNames = {
      nextDayWeatherName: data.days[3].icon,
      nextTwoDayWeatherName: data.days[4].icon,
      nextThreeDayWeatherName: data.days[5].icon,
      nextFourDayWeatherName: data.days[6].icon,
      nextFiveDayWeatherName: data.days[7].icon,
      nextSixDayWeatherName: data.days[8].icon,
      nextSevenDayWeatherName: data.days[9].icon,
    };

    const misc = {
      city: data.resolvedAddress,
      weatherDescription: data.description,
      weatherIcon: data.currentConditions.icon,
      uvIndex: data.currentConditions.uvindex,
      rainProbability: `${data.currentConditions.precipprob}%`,
      // humidity: data.currentConditions.humidity,
      windSpeed: `${data.currentConditions.windspeed} km/h`,
      // pressure: data.currentConditions.pressure,
      // sunset: data.currentConditions.sunset,
    };

    const currentHour = new Date().getHours();
    const hourlyIcons = {
      nextHourIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 1) % 24].icon,
      nextTwoHoursIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 2) % 24].icon,
      nextThreeHoursIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 3) % 24].icon,
      nextFourHoursIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 4) % 24].icon,
      nextFiveHoursIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 51) % 24].icon,
      nextSixHoursIcon:
        data.days[getHour(currentHour)].hours[(currentHour + 6) % 24].icon,
    };

    for (const icon in hourlyIcons) {
      import(`../assets/${hourlyIcons[icon]}.svg`).then(
        (result) => (document.getElementById(icon).src = result.default),
      );
    }

    import(`../assets/${data.currentConditions.icon}.svg`).then(
      (result) => (document.querySelector(".weatherIcon").src = result.default),
    );

    for (const temperature in temperatures) {
      document.querySelector(`.${temperature}`).textContent =
        `${temperatures[temperature]} ${tempUnit}`;
    }

    for (const icon in weatherNames) {
      import(`../assets/${weatherNames[icon]}.svg`).then(
        (img) => (document.getElementById(icon).src = img.default),
      );
    }

    [weatherNames, misc, days].forEach((item) => {
      for (const info in item) {
        document.querySelector(`.${info}`).textContent = item[info];
      }
    });
  };

  const getHoursMinTemperature = (data, hours, el) => {
    let temp;
    let time;
    const hour = new Date().getHours() + hours;
    if (hour > 23) {
      time = new Date(
        data.days[3].hours[hour % 24].datetimeEpoch * 1000,
      ).getHours();
      temp = data.days[3].hours[hour % 24].temp;
    } else {
      time = new Date(data.days[2].hours[hour].datetimeEpoch * 1000).getHours();
      temp = data.days[2].hours[hour].temp;
    }
    if (time >= 12) {
      document.querySelector(`.${el}`).textContent = `${time % 12}:00 PM`;
    } else {
      document.querySelector(`.${el}`).textContent = `${time % 12}:00 AM`;
    }
    return temp;
  };

  const getHour = (hour) => {
    return hour > 23 ? 3 : 2;
  };

  const build = () => {
    const homepageMainTemplate = document.getElementById("homepage-main-temp");
    const homepageMainClone = homepageMainTemplate.content.cloneNode(true);
    mainContent.appendChild(homepageMainClone);

    const homepageAsideTemplate = document.getElementById(
      "homepage-aside-template",
    );
    const homepageAsideClone = homepageAsideTemplate.content.cloneNode(true);
    asideSection.appendChild(homepageAsideClone);
  };
  return { homepageUpdater, build };
}
