window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=1bb4bd788ea1401db6f195022200608&q=${lat},${long}
      `;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temperature = data.current.temp_f;
          const condition = data.current.condition.text;
          const location = data.location.region;
          const icon = data.current.condition.icon;

          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = condition;
          locationTimezone.textContent = location;
          //Set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
    });
  } else {
    h1.textContent = "Please allow your location";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = condition.replace(" ", "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
