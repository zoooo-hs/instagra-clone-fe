export interface Post {
    id: number;
    description: string;
    photos: Photo[];
    user: User;
    comment_count: number;
    like_count: number;
    liked: boolean;
    liked_id: number;
    created_at: Date;
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
    comment_count: number,
    liked_id: number,
    created_at: Date,
}

export interface HashTag {
    tag: string,
    count: number
}

export interface ValidationError {
    field: string,
    rejected_value: string | number | boolean,
    default_message: string
}
export interface Error {
    status: string,
    message: string,
    code: string,
    validations?: ValidationError[]
}
