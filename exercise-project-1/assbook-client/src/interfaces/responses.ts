import { Comment } from "./comment";
import { Post } from "./post";
import { User } from "./user";

export interface PostsResponse {
    posts: Post[]; 
}

export interface SinglePostResponse {
    post: Post;
}

export interface TokenResponse {
    accessToken: string;
}

export interface UserResponse {
    user: User;
}

export interface UsersResponse {
    users: User[];
}

export interface AvatarResponse {
    avatar: string;
}

export interface LikeResponse {
    totalLikes: number;
}

export interface CommentsResponse {
    comments: Comment[];
}

export interface CommentResponse {
    comment: Comment;
}