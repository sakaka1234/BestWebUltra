export type Friend = {
  _id: string;
  friend: {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
  };
};

export type FriendRequest = {
  _id: string;
  sender: {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
  };
};
