"use strict";

import {PostsService} from "./classes/posts-service.js";

const service = new PostsService;
const posts = service.getAll();
let container = document.getElementById("postContainer");

ShowPosts(posts);

function ShowPosts(posts){
    service.getAll().then(posts => {
        posts.forEach(post => {
            let title = post.title;
            let description = post.description;
            let mood = post.mood;
    
            let img = document.createElement("img");
            if(post.image){
                img.src = post.image;
            }else{
                img.src = "";
            }
    
            let divCard = document.createElement("div");
            if (mood == 0) {
                divCard.className = "card mb-4 shadow";
            }
            else if (mood == 1) {
                divCard.className = "card mb-4 border-success shadow";
            }
            else if (mood == 2) {
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
    
            let date = post.date;
    
            smallDivCardFooterRowColTextMuted.append(date);
            divCardFooterRowColTextMuted.append(smallDivCardFooterRowColTextMuted);
    
            divCardFooterRowCol.append(divCardFooterRowColName, divCardFooterRowColTextMuted);
    
            let iDivCardFooterRowColPT2Up = document.createElement("i");
            iDivCardFooterRowColPT2Up.className = "fa-regular fa-thumbs-up me-3";
    
            let iDivCardFooterRowColPT2Down = document.createElement("i");
            iDivCardFooterRowColPT2Down.className = "fa-regular fa-thumbs-down";
    
            iDivCardFooterRowColPT2Up.addEventListener('click', async e => {
                iDivCardFooterRowColPT2Up.classList.toggle("text-primary");
                if (iDivCardFooterRowColPT2Up.classList.contains("text-primary")){
                    await service.postVote(post.id,true);
                    iDivCardFooterRowColPT2Down.classList.remove("text-danger");
                }else{
                    await service.deleteVote(post.id);
                }
            });
    
            iDivCardFooterRowColPT2Down.addEventListener('click', async e => {
                iDivCardFooterRowColPT2Down.classList.toggle("text-danger");
                if (iDivCardFooterRowColPT2Down.classList.contains("text-danger")){
                    await service.postVote(post.id,false);
                    iDivCardFooterRowColPT2Up.classList.remove("text-primary");
                }else{
                    await service.deleteVote(post.id);
                }
            });
    
            divCardFooterRowColPT2.append(iDivCardFooterRowColPT2Up, iDivCardFooterRowColPT2Down);
    
            container.append(divCard);
        })
    }).catch(error => {
        console.log(error);
    });
}