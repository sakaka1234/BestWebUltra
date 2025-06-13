export type Comment = {
  _id: string;
  content: string;
  commenter: {
    _id: string;
    name: string;
    profilePic?: string;
  };
  createdAt: string;
};

export type CommentReply = {
  content: string;
  userId: string;
};
