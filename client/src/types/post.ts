export type Post = {
    _id: string;
    title: string;
    image: string;
    content: string;
    author: {
        _id: string;
        name: string;
        profilePic?: string; 
    }
    topic: string;
    createdAt: string; 
}