import { Http } from "./http.js";
import { SERVER } from "../constants.js";
import { Post, PostInsert } from "../interfaces/post.js";
import { PostsResponse, SinglePostResponse } from "../interfaces/responses.js";

export class PostsService {
    #http = new Http;
    
    // Devuelve todos los posts
    async getAll(): Promise<Array<Post>> {
        const resp: PostsResponse = await this.#http.get(`${SERVER}/posts`);
        return resp.posts;
    }

    // Devuelve un solo post en función de la "id" pasada por parámetro
    async get(id: number): Promise<Post> {
        const resp: SinglePostResponse = await this.#http.get(`${SERVER}/posts/${id}`);
        return resp.post;
    }
    async post(post: PostInsert): Promise<Post> {
        const resp: SinglePostResponse = await this.#http.post(`${SERVER}/posts`, post);
        return resp.post;
    }
    async delete(id: number): Promise<void> {
        await this.#http.delete(`${SERVER}/posts/${id}`);
    }
    async postVote(id: number, vote: boolean): Promise<void> {
        const jsonVote = {
            likes: vote
        };
        await this.#http.post(`${SERVER}/posts/${id}/likes`, jsonVote);
    }
    async deleteVote(id: number): Promise<void> {
        await this.#http.delete(`${SERVER}/posts/${id}/likes`);
    }
    toHTML(post: Post): HTMLDivElement {
        const service = new PostsService();
        const title = post.title;
        const description = post.description;
        const mood = post.mood;

        const img = document.createElement("img");
        if (post.image) {
            img.src = post.image;
        } else {
            img.src = "";
        }

        const divCard = document.createElement("div");
        if (mood == 0) {
            divCard.className = "card mb-4 shadow";
        }
        else if (mood == 1) {
            divCard.className = "card mb-4 border-success shadow";
        }
        else if (mood == 2) {
            divCard.className = "card mb-4 border-danger shadow";
        }

        const imgCard = document.createElement("img");
        imgCard.className = "card-img-top";
        imgCard.src = img.src;

        imgCard.addEventListener("click", () => {
            location.assign("post-detail.html?id=" + post.id);
        });

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        const divCardFooter = document.createElement("div");
        divCardFooter.className = "card-footer bg-transparent";

        divCard.append(imgCard, divCardBody, divCardFooter);

        const h5Card = document.createElement("h5");
        h5Card.className = "card-title";
        h5Card.append(title!);

        const pDescription = document.createElement("p");
        pDescription.className = "card-text";
        pDescription.append(description!);

        divCardBody.append(h5Card, pDescription);

        const divCardFooterRow = document.createElement("div");
        divCardFooterRow.className = "row";

        divCardFooter.append(divCardFooterRow);

        const divCardFooterRowColAvatar = document.createElement("div");
        divCardFooterRowColAvatar.className = "col-auto avatar ps-1 pe-1";

        const divCardFooterRowCol = document.createElement("div");
        divCardFooterRowCol.className = "col";

        const divCardFooterRowColPT2 = document.createElement("div");
        divCardFooterRowColPT2.className = "col-auto pt-2";

        divCardFooterRow.append(divCardFooterRowColAvatar, divCardFooterRowCol, divCardFooterRowColPT2);

        const imgDivCardFooter = document.createElement("img");
        imgDivCardFooter.src = post.creator.avatar;
        imgDivCardFooter.className = "rounded-circle";

        divCardFooterRowColAvatar.append(imgDivCardFooter);

        const divCardFooterRowColName = document.createElement("div");
        divCardFooterRowColName.className = "name";
        const avatarName = document.createTextNode(post.creator.name);
        divCardFooterRowColName.append(avatarName);

        divCardFooterRowColName.addEventListener("click", () =>{
            location.assign("profile.html?id=" + post.creator.id);
        });

        const divCardFooterRowColTextMuted = document.createElement("div");
        const smallDivCardFooterRowColTextMuted = document.createElement("small");
        smallDivCardFooterRowColTextMuted.className = "text-muted";

        const date = post.date;

        smallDivCardFooterRowColTextMuted.append(date);
        divCardFooterRowColTextMuted.append(smallDivCardFooterRowColTextMuted);

        if (post.mine) {
            const divCardFooterRowColColAuto = document.createElement("div");
            divCardFooterRowColColAuto.className = "col-auto";
            const buttonDivCardFooterRowColColAuto = document.createElement("button");
            buttonDivCardFooterRowColColAuto.className = "btn btn-danger mr-3 h-100 delete";
            const buttonName = document.createTextNode("Delete");
            buttonDivCardFooterRowColColAuto.append(buttonName);
            divCardFooterRowColColAuto.append(buttonDivCardFooterRowColColAuto);

            buttonDivCardFooterRowColColAuto.addEventListener("click", async () => {
                await service.delete(post.id);
                location.assign("index.html");
            });

            divCardFooterRowCol.append(divCardFooterRowColName, divCardFooterRowColTextMuted, divCardFooterRowColColAuto);
        }
        else {
            divCardFooterRowCol.append(divCardFooterRowColName, divCardFooterRowColTextMuted);
        }

        const iDivCardFooterRowColPT2Up = document.createElement("i");
        iDivCardFooterRowColPT2Up.className = "fa-regular fa-thumbs-up me-3";

        const iDivCardFooterRowColPT2Down = document.createElement("i");
        iDivCardFooterRowColPT2Down.className = "fa-regular fa-thumbs-down";

        iDivCardFooterRowColPT2Up.addEventListener("click", async () => {
            iDivCardFooterRowColPT2Up.classList.toggle("text-primary");
            if (iDivCardFooterRowColPT2Up.classList.contains("text-primary")) {
                await service.postVote(post.id, true);
                iDivCardFooterRowColPT2Down.classList.remove("text-danger");
            } else {
                await service.deleteVote(post.id);
            }
        });

        iDivCardFooterRowColPT2Down.addEventListener("click", async () => {
            iDivCardFooterRowColPT2Down.classList.toggle("text-danger");
            if (iDivCardFooterRowColPT2Down.classList.contains("text-danger")) {
                await service.postVote(post.id, false);
                iDivCardFooterRowColPT2Up.classList.remove("text-primary");
            } else {
                await service.deleteVote(post.id);
            }
        });

        const divDivCardFooterRowColPT2Mt1 = document.createElement("div");
        divDivCardFooterRowColPT2Mt1.className = "mt-1";

        const iDivCardFooterRowColPT2Mt1Div = document.createElement("small");
        iDivCardFooterRowColPT2Mt1Div.className = "text-muted likes";
        const totalLikes = document.createTextNode(`${post.totalLikes} likes`);

        iDivCardFooterRowColPT2Mt1Div.append(totalLikes);
        divDivCardFooterRowColPT2Mt1.append(iDivCardFooterRowColPT2Mt1Div);

        divCardFooterRowColPT2.append(iDivCardFooterRowColPT2Up, iDivCardFooterRowColPT2Down, divDivCardFooterRowColPT2Mt1);

        return divCard;
    }
}