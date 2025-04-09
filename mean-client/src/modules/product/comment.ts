export interface Comment {
    _id?: string; // Optional ID for the comment
    author: string;
    text: string;
    timestamp: Date;
}