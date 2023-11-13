import { SERVER } from "../constants";
import { UserResponse } from "../interfaces/responses";
import { User, UserAvatarEdit, UserPasswordEdit, UserProfileEdit } from "../interfaces/user";
import { Http } from "./http";

export class UserService {
    #http = new Http;
    async getProfile(id?: number): Promise<User>{
        if(id){
            const resp = await this.#http.get<UserResponse>(`${SERVER}/users/${id}`);
            return resp.user;
        }
        else{
            const resp = await this.#http.get<UserResponse>(`${SERVER}/users/me`);
            return resp.user;
        }
    }
    async saveProfile(name: string, email: string): Promise<void>{
        const userProfile: UserProfileEdit = {
            name: name,
            email: email
        };
        await this.#http.put<void,UserProfileEdit>(`${SERVER}/users/me`, userProfile);
    }
    async saveAvatar(avatar: string): Promise<string>{
        const userAvatar: UserAvatarEdit = {
            avatar: avatar
        };
        const resp = await this.#http.put<string,UserAvatarEdit>(`${SERVER}/users/me/avatar`, userAvatar);
        return resp;
    }
    async savePassword(password: string): Promise<void>{
        const userPassword: UserPasswordEdit = {
            password: password
        };
        await this.#http.put<void,UserPasswordEdit>(`${SERVER}/users/me/password`, userPassword);
    }
}
