"use strict";

import { PostsService } from "./classes/posts-service.js";

const service = new PostsService;

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

    if (titlePost.trim(" ") != "" || descriptionPost.trim(" ") != "" || form.image.value != "") {

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
});
