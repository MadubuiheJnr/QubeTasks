import { Badge } from "@/components/ui/badge";
import { MobileProfile } from "@/components/user-profile/mobile-profile";
import { useAuth } from "@/provider/auth-context";
import type { User } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user } = useAuth() as {
    user: User;
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="p-6 w-[65%] flex items-center justify-between">
        <Badge
          variant={"outline"}
          className="p-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Badge>
        <p className="text-xl font-semibold text-primary">Profile</p>
      </div>

      <div className="bg-secondary/30 p-3">
        <MobileProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;
