export type Post = {
  _id: string;
  title: string;
  imageURL?: string; // Changed from image to imageURL to match server
  content: string;
  author: {
    _id: string;
    name: string;
    profilePic: string;
  };
  topic: string;
  comments?: Comment[];
  createdAt: string;
};
