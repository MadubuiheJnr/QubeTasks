import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Password } from "./password";
import type { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Security } from "./security";

export const PasswordAndSecurityDrawer = ({
  user,
  isOpen,
  onOpenChange,
}: {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Password & Security</DrawerTitle>
          <DrawerDescription>
            Change your password and review security details related to your
            account, such as recent sign-ins and activity
          </DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="password" className="overflow-y-auto">
          <TabsList className="mx-auto">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <Password />
          </TabsContent>
          <TabsContent value="security">
            <Security />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};
