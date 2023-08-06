const row = document.querySelector(".row");
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


function getData(country) {
  // Create an XMLHttpRequest object
  const xhttp = new XMLHttpRequest();

  // Send a request
  xhttp.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=0d45de9315ee48ad9b394900230608&q=${country}&days=3`
  );
  xhttp.send();

  xhttp.addEventListener("readystatechange", () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      const response = JSON.parse(xhttp.response);
      console.log(response)
      currentDay(response.current, response.location);
      futureDay(response.forecast);
    }
  });
}

function currentDay(current, location) {
  row.innerHTML = `<div class="col-lg-4 bg-black bg-opacity-75 text-white-50 p-4">
  <div class="today forecast">
      <div class="forecast-header d-flex justify-content-between align-items-center text-white-50 pb-3 shadow-lg" id="today">
      <div class="day">${
        dayNames[new Date().getDay(location.localtime)]}</div>
      <div class=" date">${new Date().getDate(location.localtime)} ${
        monthNames[new Date().getMonth(location.localtime)]
      }</div>
      </div> 
      <div class="location">${
        location.region
      }, ${location.country}</div>
      <div class="forecast-content" id="current">
          <div class="d-flex justify-content-between align-items-center">
              <p class="card-text fs-1 fw-bold text-white">${
                current.temp_c}<sup>o</sup>C</p>
              <img src="${current.condition.icon}" alt="" width="90">
            </div>    
      </div>
      <div class="custom text-primary pb-3">${current.condition.text}</div>
      <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="22">${
        current.humidity
      }%</span>
      <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="22">${
        current["wind_kph"]
      }km/h</span>
      <span class="me-3"><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="22">East</span>
  </div>
</div>`;
}

function futureDay(future) {
    for (let i = 1; i <= 2; i++) {
        row.innerHTML+=`<div class="col-lg-4 bg-black bg-opacity-75 text-white-50 p-4">
        <div class="forecast text-center">
            <div class="forecast-header">
                <div class="day pb-3 shadow-lg">${
                    dayNames[new Date(future.forecastday[i].date).getDay()]
                  }</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon m-auto pb-3">
                    <img src="${
                        future.forecastday[i].day.condition.icon
                      }" alt="" width="48">
                </div>
                <div class="degree fw-bold text-white display-6 pb-3">${
                    future.forecastday[i].day.maxtemp_c
                  }<sup>o</sup>C</div>
                <small class="pb-2">${
                    future.forecastday[i].day.mintemp_c
                  }<sup>o</sup></small>
                <div class="custom text-primary">${
                    future.forecastday[i].day.condition.text
                  }</div>
            </div>
            </div>
    </div>`
    }
}
document.querySelector("#input").addEventListener("keyup", (e) => {
    row.innerHTML = "";
    if (e.target.value == "") {
      getData("Cairo");
    } else {
      getData(e.target.value);
    }
  });
  
getData('cairo')

