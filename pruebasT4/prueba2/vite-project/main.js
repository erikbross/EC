import { MyGeolocation } from "./myGeolocation";

const API_KEY = "And7ow8oCOZlnHu8UNtYtt-v-cj4yFeuTSWEHtJR22rfffBWq70xxRBAYCEX9DXC";

async function showStaticMap() {
  const coords = await MyGeolocation.getGeolocation();
  const latlon = coords.latitude + "," + coords.longitude;

  const imgUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latlon}/15?mapSize=600,300&pp=${latlon};66&mapLayer=Basemap,Buildings&key=${API_KEY}`;

  document.getElementById("imgMap").src = imgUrl;
}

showStaticMap();

function loadBingAPI(apiKey) {
  const script = document.createElement("script");
  script.src = `https://www.bing.com/api/maps/mapcontrol?key=${apiKey}&callback=showMap`;
  script.defer = true;
  document.body.append(script);
}

window.showMap = () =>{
  new window.Microsoft.Maps.Map(document.getElementById('map'), {});
}

loadBingAPI(API_KEY);
