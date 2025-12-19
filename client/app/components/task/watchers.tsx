import type { User } from "@/types";
import { AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Watchers = ({ watchers }: { watchers: User[] }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
      <h3 className="text-sm font-semibold mb-4">Watchers</h3>

      <div className="space-y-2">
        {watchers && watchers.length > 0 ? (
          watchers.map((watcher) => (
            <div key={watcher._id} className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={watcher.profilePicture} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {watcher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">{watcher.name}</p>
            </div>
          ))
        ) : (
          <Badge variant={"outline"}>
            <AlertCircle /> No Watchers
          </Badge>
        )}
      </div>
    </div>
  );
};
