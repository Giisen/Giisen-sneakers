const apilist = document.querySelector("#api");

async function getAPI() {
  const url = new URL(
    "https://api.open-meteo.com/v1/forecast?latitude=61.71&longitude=12.72&current_weather=true&timezone=auto&daily=sunrise,sunset,snowfall_sum"
    //   "https://api.open-meteo.com/v1/forecast?latitude=57.71&longitude=11.72&current_weather=true&hourly=temperature_2m,snow_depth"

    // `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean`
  );

  // &daily=snowfall_sum

  const response = await fetch(url);
  if (response.status === 200) {
    const jsonResponse = await response.json();
    // questions.splice(0, questions.length);

    let totalSnow = 0.0;

    for (const snow of jsonResponse.daily.snowfall_sum) {
      totalSnow += snow;
    }

    const cardText = document.createElement("div");
    cardText.innerText = totalSnow;
    if (totalSnow < 3) {
      cardText.innerText =
        "Barely any snow this week, enjoy a walk in your sneakers";
    } else if (totalSnow < 10) {
      cardText.innerText =
        "Only some light snow this week, your are goood to go in your new sneakers";
    } else {
      cardText.innerText =
        "There has been some snow this week, but what the hell, snekers can be worn year round";
    }

    apilist.append(cardText);

    //  const cardText = document.createElement("div");
    //  cardText.innerText = jsonResponse.current_weather.temperature;
    //  apilist.append(cardText);

    console.log(url);
    console.log("Här bryter jag");
    console.log(jsonResponse);
    console.log("Här bryter jag igen");
    console.log(jsonResponse.current_weather.temperature);
    console.log(jsonResponse.daily.snowfall_sum);
    console.log(totalSnow / 7);
  }
}
getAPI();

// 57.71, 11.72;
// 61.1961772160345, 12.797455802591237;
