import { SERVER } from "../constants";
import { TokenResponse } from "../interfaces/responses";
import { UserLogin, User } from "../interfaces/user";
import { Http } from "./http";

export class AuthService {
    #http = new Http;

    async login(userLogin: UserLogin): Promise<void> {
        const token = await this.#http.post<TokenResponse, UserLogin>(`${SERVER}/auth/login`, userLogin);

        localStorage.setItem("token", token.accessToken);
    }

    async register(userInfo: User): Promise<void> {
        await this.#http.post(`${SERVER}/auth/register`, userInfo);
    }

    async checkToken(): Promise<void> {
        await this.#http.get(`${SERVER}/auth/validate`);
    }

    logout(): void {
        localStorage.removeItem("token");
        location.assign("index.html");
    }
}
