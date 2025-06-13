import { FriendCardInvite } from "../../../../../components/ui";
import { FriendCard } from "../../../../../components/ui";
import { useFriendInvitations, useFriendsList } from "../../../../../services";
import { Friend, FriendRequest } from "../../../../../types";

export const FriendPage = () => {
  const { data: invitations, isLoading: isInvitationsLoading } = useFriendInvitations();
  const { data: friends, isLoading: isFriendsLoading } = useFriendsList();

  return (
    <div className="flex items-start gap-20">
      {/* Friend Invite */}
      <div className="flex flex-col items-start gap-2">
        <span className="text-lg font-semibold text-gray-200">Friend Invite</span>
        {isInvitationsLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="flex gap-2 flex-col overflow-y-auto max-h-[600px]">
            {invitations?.data?.map((invite: FriendRequest) => (
              <FriendCardInvite
                key={invite._id}
                id={invite._id}
                userImage={invite.sender.profilePic || "link_avatar"}
                userName={invite.sender.fullname}
              />
            ))}
          </div>
        )}
      </div>

      {/* My Friends */}
      <div className="flex flex-col items-start gap-2">
        <span className="text-lg font-semibold text-gray-200">My Friends</span>
        {isFriendsLoading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <div className="flex gap-2 flex-col overflow-y-auto max-h-[600px]">
            {friends?.data?.map((friend: Friend) => (
              <FriendCard
                key={friend._id}
                userImage={friend.friend.profilePic || "link_avatar"}
                userName={friend.friend.fullname}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
