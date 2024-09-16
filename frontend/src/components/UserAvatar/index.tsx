import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Autor } from "@/redux/slices/postsSlice";

interface AvatarType {
  user?: Autor;
  imageUrl?: string;
  content?: string;
}

const UserAvatar: React.FC<AvatarType> = ({ user, imageUrl, content }) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={user?.avatarUrl || imageUrl} />
        <AvatarFallback>
          {user?.fullName.includes("")
            ? user?.fullName
                .split(" ")
                .map((item) => item.slice(0, 1))
                .join("")
            : user?.fullName.slice(0, 1) || content}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
