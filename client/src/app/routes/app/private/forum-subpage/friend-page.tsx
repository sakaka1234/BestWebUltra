import { FriendCardInvite } from "../../../../../components/ui";
import { FriendCard } from "../../../../../components/ui";

export const FriendPage = () => {
  return (
    <div className="flex items-start gap-20">
      <div className="flex flex-col items-start gap-2 ">
        <span className="text-lg font-semibold text-gray-200">
          Friend Invite
        </span>
        <FriendCardInvite
          userImage="link_avatar"
          userName="Tên người gửi"
          onAccept={() => {
            /* xử lý accept */
          }}
          onReject={() => {
            /* xử lý reject */
          }}
        />
        <FriendCardInvite
          userImage="link_avatar"
          userName="Tên người gửi"
          onAccept={() => {
            /* xử lý accept */
          }}
          onReject={() => {
            /* xử lý reject */
          }}
        />
        <FriendCardInvite
          userImage="link_avatar"
          userName="Tên người gửi"
          onAccept={() => {
            /* xử lý accept */
          }}
          onReject={() => {
            /* xử lý reject */
          }}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-lg font-semibold text-gray-200">My Friends</span>
        <div className="flex gap-2 flex-col overflow-y-auto max-h-[600px]">
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
          <FriendCard userImage="link_avatar" userName="Tên người gửi" />
        </div>
      </div>
    </div>
  );
};
