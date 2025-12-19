import type { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const ProfileCard = ({ user }: { user: User }) => {
  return (
    <Card className="py-2">
      <CardContent className=" flex items-center gap-3 px-3">
        <Avatar className="size-20">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback className="uppercase font-bold">
            {user?.name.charAt(0)}
            {user?.name.charAt(1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-semibold text-primary">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};
