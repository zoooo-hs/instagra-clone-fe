export interface Post {
    id: number;
    description: string;
    photos: Photo[];
    user: User;
    commentCount: number;
    likeCount: number;
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