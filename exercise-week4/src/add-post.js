"use strict";

import { PostsService } from "./classes/posts-service.js";

const service = new PostsService;
const API_KEY = "And7ow8oCOZlnHu8UNtYtt-v-cj4yFeuTSWEHtJR22rfffBWq70xxRBAYCEX9DXC";
let varLongitude = 0;
let varLatitude = 0;

let form = document.getElementById("newPlace");
let imgPreview = document.getElementById("imgPreview");
let postPhoto = document.getElementById("postPhoto");
let postLocation = document.getElementById("postLocation");
let groupPhoto = document.getElementById("photo-group");
let groupLocation = document.getElementById("location-group");


postPhoto.addEventListener("click", () => {
    groupPhoto.classList.remove("d-none");
    groupLocation.classList.add("d-none");
});

postLocation.addEventListener("click", () => {
    groupLocation.classList.remove("d-none");
    groupPhoto.classList.add("d-none");
    loadBingAPI(API_KEY);
    window.showMap = async () => {
        const coords = await getGeolocation();
        const center = new window.Microsoft.Maps.Location(coords.latitude, coords.longitude);

        const map = new window.Microsoft.Maps.Map(document.getElementById("map"), {
            credentials: API_KEY,
            center, // same as center: center
            mapTypeId: window.Microsoft.Maps.MapTypeId.road,
            zoom: 14,
        });
        window.Microsoft.Maps.loadModule("Microsoft.Maps.AutoSuggest", () => {
            const manager = new window.Microsoft.Maps.AutosuggestManager({ map, businessSuggestions: true });
            manager.attachAutosuggest("#place", "#location-container", (result) => {
                map.setView({ center: result.location });
                console.log(center);
                varLatitude = result.location.latitude;
                varLongitude = result.location.longitude;
            });
        });
    };
});

form.image.addEventListener("change", event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
        // Remove d-none class from the element “imgPreview”
        imgPreview.src = reader.result;
        imgPreview.className = "img-thumbnail";
    });
});

form.addEventListener("submit", async e => {
    e.preventDefault();

    let titlePost = form.title.value;
    let descriptionPost = form.description.value;
    let moodPost = +form.mood.value;

    let errorMsg = document.getElementById("errorMsg");

    if (!groupPhoto.classList.contains("d-none")){
        if (titlePost.trim(" ") != "" || descriptionPost.trim(" ") != "" || form.image.value != ""){

            let imgPost = imgPreview.src;
    
            let datePost = Intl.DateTimeFormat("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short"
            }).format(new Date());
    
            const jsonPost = {
                title: titlePost,
                description: descriptionPost,
                date: datePost,
                image: imgPost,
                place: null,
                lat: null,
                lng: null,
                mood: moodPost,
                likes: null
            };
            await service.post(jsonPost).catch(location);
            window.location.href = "index.html";
        }
        else {
            errorMsg.classList.toggle("hidden");
            setTimeout(() => {
                errorMsg.classList.toggle("hidden");
            }, 3000);
        }
    }
    else{
        let addressPost = form.place.value;

        if (titlePost.trim(" ") != "" || descriptionPost.trim(" ") != "" || addressPost.trim(" ") != ""){

            let imgPost = imgPreview.src;
    
            let datePost = Intl.DateTimeFormat("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short"
            }).format(new Date());
    
            if (varLatitude != 0 && varLongitude != 0){
                const jsonPost = {
                    title: titlePost,
                    description: descriptionPost,
                    date: datePost,
                    image: imgPost,
                    place: addressPost,
                    lat: varLatitude,
                    lng: varLongitude,
                    mood: moodPost,
                    likes: null
                };

                await service.post(jsonPost).catch(location);
                window.location.href = "index.html";
            }
            else{
                errorMsg.classList.toggle("hidden");
                setTimeout(() => {
                    errorMsg.classList.toggle("hidden");
                }, 3000);
            }
            
        }
        else {
            errorMsg.classList.toggle("hidden");
            setTimeout(() => {
                errorMsg.classList.toggle("hidden");
            }, 3000);
        }
    }
});

async function getGeolocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position.coords);
            },
            (error) => {
                switch (error.code) {
                case error.PERMISSION_DENIED: // User didn't allow the web page to trieve location
                    reject("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE: // Couldn't get the location
                    reject("Location information is unavailable.");
                    break;
                case error.TIMEOUT: // The maximum amount of time to get location formation has passed
                    reject("The request to get user location timed out.");
                    break;
                default:
                    reject("An unknown error occurred.");
                    break;
                }
            }
        );
    });
}

async function showStaticMap() {
    const coords = await getGeolocation();
    const latlon = coords.latitude + "," + coords.longitude;

    const imgUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latlon}/15?mapSize=600,300&pp=${latlon};66&mapLayer=Basemap,Buildings&key=${API_KEY}`;
    document.getElementById("map").src = imgUrl;
}

showStaticMap();

function loadBingAPI() {
    const script = document.createElement("script");
    script.src = "https://www.bing.com/api/maps/mapcontrol?callback=showMap";
    script.defer = true;
    document.body.append(script);
}

loadBingAPI(API_KEY);