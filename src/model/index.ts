export interface Post {
    id: number;
    description: string;
    photos: Photo[];
    user: User;
    comment_count: number;
    like_count: number;
    liked: boolean;
}

export interface Photo {
    id: number,
    path: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    bio: string;
    photo: Photo;
}

export interface SignIn {
    email: string;
    password: string;
}

export interface Comment {
    id: number,
    content: string,
    user: User,
    like_count: number,
    liked: boolean,
    comment_count: number
}