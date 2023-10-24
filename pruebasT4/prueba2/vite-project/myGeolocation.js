export class MyGeolocation {
    static getGeolocation() {
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
  }
  