import type { User } from "@/types";
import {
  Bell,
  Bug,
  ChevronRight,
  FileText,
  HelpCircle,
  Info,
  Languages,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/auth-context";
import { ProfileCard } from "./profile-card";
import { useState } from "react";
import { AlertDialog } from "@/components/alert-dialog";

export const MobileProfile = ({ user }: { user: User }) => {
  const { logout } = useAuth();
  const [isAlert, setIsAlert] = useState(false);
  return (
    <>
      <div className="space-y-10 py-3">
        <ProfileCard user={user} />

        {/* Account Settings section */}
        <div>
          <p className="font-medium text-base text-muted-foreground">Account</p>
          <Card className="mt-2">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3 ">
                  <UserCircle className="size-5 " />
                  <span className="text-base ">Manage Profile</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <LockKeyhole className="size-5" />
                  <span className="text-base">Password & Security</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <Bell className="size-5" />
                  <span className="text-base">Notifications</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <Languages className="size-5" />
                  <span className="text-base">Language</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Support Section */}
        <div>
          <p className="font-medium text-base text-muted-foreground">
            App Support
          </p>
          <Card className="mt-2">
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <Info className="size-5" />
                  <span className="text-base">About Us</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <Bug className="size-5" />
                  <span className="text-base">Report bug</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <HelpCircle className="size-5" />
                  <span className="text-base">Help Center</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <FileText className="size-5" />
                  <span className="text-base">Terms of Use</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
              <div className="flex items-center justify-between cursor-pointer">
                <p className="flex items-center gap-3">
                  <ShieldCheck className="size-5" />
                  <span className="text-base">Privacy Policy</span>
                </p>
                <ChevronRight className="size-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={() => setIsAlert(true)}
          className="w-full cursor-pointer"
        >
          <LogOut /> Log out
        </Button>
      </div>

      <AlertDialog
        title="Log out?"
        description="You'll be signed out of your account and will need to log in again to continue"
        isAlert={isAlert}
        onAlertChange={setIsAlert}
        alertActionText="Log out"
        onAlertAction={logout}
      />
    </>
  );
};
