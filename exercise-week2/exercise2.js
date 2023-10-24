"use strict";

let form = document.getElementById("newPlace");
let imgPreview = document.getElementById("imgPreview");
let container = document.getElementById("postContainer");

form.image.addEventListener('change', event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
        // Remove d-none class from the element “imgPreview”
        imgPreview.src = reader.result;
        imgPreview.className = "img-thumbnail";
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();

    let title = form.title.value;
    let description = form.description.value;
    let mood = form.mood.value;

    let errorMsg = document.getElementById("errorMsg");

    if (title.trim(" ") != "" || description.trim(" ") != "" || form.image.value != "") {

        let img = document.createElement("img");
        img.src = imgPreview.src;

        let divCard = document.createElement("div");
        if(mood == 0){
            divCard.className = "card mb-4 shadow";
        }
        else if (mood == 1) {
            divCard.className = "card mb-4 border-success shadow";
        }
        else if (mood == 2){
            divCard.className = "card mb-4 border-danger shadow";
        }

        let imgCard = document.createElement("img");
        imgCard.className = "card-img-top";
        imgCard.src = img.src;

        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        let divCardFooter = document.createElement("div");
        divCardFooter.className = "card-footer bg-transparent";

        divCard.append(imgCard, divCardBody, divCardFooter);

        let h5Card = document.createElement("h5");
        h5Card.className = "card-title";
        h5Card.append(title);

        let pDescription = document.createElement("p");
        pDescription.className = "card-text";
        pDescription.append(description);

        divCardBody.append(h5Card, pDescription);

        let divCardFooterRow = document.createElement("div");
        divCardFooterRow.className = "row";

        divCardFooter.append(divCardFooterRow);

        let divCardFooterRowColAvatar = document.createElement("div");
        divCardFooterRowColAvatar.className = "col-auto avatar ps-1 pe-1";

        let divCardFooterRowCol = document.createElement("div");
        divCardFooterRowCol.className = "col";

        let divCardFooterRowColPT2 = document.createElement("div");
        divCardFooterRowColPT2.className = "col-auto pt-2";

        divCardFooterRow.append(divCardFooterRowColAvatar, divCardFooterRowCol, divCardFooterRowColPT2);

        let imgDivCardFooter = document.createElement("img");
        imgDivCardFooter.src = "./img/avatar.png";
        imgDivCardFooter.className = "rounded-circle";

        divCardFooterRowColAvatar.append(imgDivCardFooter);

        let divCardFooterRowColName = document.createElement("div");
        divCardFooterRowColName.className = "name";
        let avatarName = document.createTextNode("Bad guy")
        divCardFooterRowColName.append(avatarName);

        let divCardFooterRowColTextMuted = document.createElement("div");
        let smallDivCardFooterRowColTextMuted = document.createElement("small");
        smallDivCardFooterRowColTextMuted.className = "text-muted";

        let date = Intl.DateTimeFormat("es-ES", {
            dateStyle: "short",
            timeStyle: "short"
        }).format(new Date());

        smallDivCardFooterRowColTextMuted.append(date);
        divCardFooterRowColTextMuted.append(smallDivCardFooterRowColTextMuted);

        divCardFooterRowCol.append(divCardFooterRowColName,divCardFooterRowColTextMuted);

        let iDivCardFooterRowColPT2Up = document.createElement("i");
        iDivCardFooterRowColPT2Up.className = "fa-regular fa-thumbs-up me-3";

        let iDivCardFooterRowColPT2Down = document.createElement("i");
        iDivCardFooterRowColPT2Down.className = "fa-regular fa-thumbs-down";

        iDivCardFooterRowColPT2Up.addEventListener('click', e => {
            if (!iDivCardFooterRowColPT2Down.classList.contains("text-danger")){
                iDivCardFooterRowColPT2Up.classList.toggle("text-primary");
            }
            else{
                iDivCardFooterRowColPT2Up.classList.toggle("text-primary");
                iDivCardFooterRowColPT2Down.classList.toggle("text-danger");
            }
        });

        iDivCardFooterRowColPT2Down.addEventListener('click', e => {
            if (!iDivCardFooterRowColPT2Up.classList.contains("text-primary")){
                iDivCardFooterRowColPT2Down.classList.toggle("text-danger");
            }
            else{
                iDivCardFooterRowColPT2Up.classList.toggle("text-primary");
                iDivCardFooterRowColPT2Down.classList.toggle("text-danger");
            }
        });

        divCardFooterRowColPT2.append(iDivCardFooterRowColPT2Up, iDivCardFooterRowColPT2Down);

        container.append(divCard);
        
    }
    else{
        errorMsg.classList.toggle("hidden");
        setTimeout(() => {
            errorMsg.classList.toggle("hidden");
        }, 3000);
    }
    form.reset();
    imgPreview.src = "";
    imgPreview.className = "img-thumbnail d-none";
});
