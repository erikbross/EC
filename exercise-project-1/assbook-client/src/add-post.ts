import { PostsService } from "./classes/posts-service.js";
import { PostInsert } from "./interfaces/post.js";
import { MapService } from "./classes/map-service.js";
import { MyGeolocation } from "./classes/my-geolocation.js";
import { AuthService } from "./classes/auth-service.js";

const service = new PostsService();
const authService = new AuthService();
let varLongitude: number = 0;
let varLatitude: number = 0;

const form = document.getElementById("newPlace") as HTMLFormElement;
const imgPreview = document.getElementById("imgPreview") as HTMLImageElement;
const postPhoto = document.getElementById("postPhoto") as HTMLFormElement;
const postLocation = document.getElementById("postLocation") as HTMLFormElement;
const groupPhoto = document.getElementById("photo-group") as HTMLFormElement;
const groupLocation = document.getElementById("location-group") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const logout = document.getElementById("logout") as HTMLElement;

// Comprobación del Token
try{
    await authService.checkToken();
}
catch {
    location.assign("login.html");
}

// Evento para quitar el token del localStorage
logout?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    authService.logout();
});

showAddPost();

// Función para mostrar todo el formulario del nuevo post
async function showAddPost(): Promise<void> {
    postPhoto.addEventListener("click", () => {
        groupPhoto.classList.remove("d-none");
        groupLocation.classList.add("d-none");
    });

    postLocation.addEventListener("click", () => {
        groupLocation.classList.remove("d-none");
        groupPhoto.classList.add("d-none");
        showMap();
    });

    form.image.addEventListener("change", (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        const reader = new FileReader();
        if (file) reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
            // Remove d-none class from the element “imgPreview”
            imgPreview!.src = reader.result as string;
            imgPreview.className = "img-thumbnail";
        });
    });

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const titlePost = title.value.trim();
        const descriptionPost = form.description.value;
        const moodPost = +form.mood.value;

        const errorMsg = document.getElementById("errorMsg");

        if (!groupPhoto.classList.contains("d-none")) {
            if (titlePost != "" || descriptionPost.trim(" ") != "" || form.image.value != "") {

                const imgPost = imgPreview.src;

                const jsonPost: PostInsert = {
                    title: titlePost,
                    description: descriptionPost,
                    image: imgPost,
                    mood: moodPost
                };
                await service.post(jsonPost);
                window.location.href = "index.html";
            }
            else {
                errorMsg!.classList.toggle("hidden");
                setTimeout(() => {
                    errorMsg!.classList.toggle("hidden");
                }, 3000);
            }
        }
        else {
            const addressPost = form.place.value;

            if (titlePost != "" || descriptionPost.trim(" ") != "" || addressPost.trim(" ") != "") {

                const imgPost = imgPreview.src;

                if (varLatitude != 0 && varLongitude != 0) {
                    const jsonPost: PostInsert = {
                        title: titlePost,
                        description: descriptionPost,
                        image: imgPost,
                        place: addressPost,
                        lat: varLatitude,
                        lng: varLongitude,
                        mood: moodPost
                    };

                    await service.post(jsonPost);
                    window.location.href = "index.html";
                }
                else {
                    errorMsg!.classList.toggle("hidden");
                    setTimeout(() => {
                        errorMsg!.classList.toggle("hidden");
                    }, 3000);
                }

            }
            else {
                errorMsg!.classList.toggle("hidden");
                setTimeout(() => {
                    errorMsg!.classList.toggle("hidden");
                }, 3000);
            }
        }
    });
}

async function showMap(): Promise<void> {
    const coords = await MyGeolocation.getLocation();
    const mapsService = await MapService.createMapService(coords, "map");
    const marker = mapsService.createMarker(coords, "red");
    const autosuggest = await mapsService.getAutoSuggestManager();
    autosuggest.attachAutosuggest("#place", "#location-container", (result) => {
        marker.setLocation(result.location);
        mapsService.map.setView({ center: result.location });
        varLatitude = result.location.latitude;
        varLongitude = result.location.longitude;
    });
}