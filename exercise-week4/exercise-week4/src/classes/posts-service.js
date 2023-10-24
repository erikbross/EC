"use strict";

import { Http } from "./http.js";
import { SERVER } from "../constants.js";

export class PostsService {
    #http = new Http;
    async getAll() {
        const resp = await this.#http.get(`${SERVER}/posts`);
        return resp.posts;
    }
    async post(post) {
        const resp = await this.#http.post(`${SERVER}/posts`, post);
        return resp.post;
    }
    async postVote(idPost, vote) {
        const jsonVote = {
            likes: vote
        };
        await this.#http.post(`${SERVER}/posts/${idPost}/likes`, jsonVote);
    }
    async deleteVote(idPost) {
        await this.#http.delete(`${SERVER}/posts/${idPost}/likes`);
    }
    async delete(idPost) {
        await this.#http.delete(`${SERVER}/posts/${idPost}`);
    }
}