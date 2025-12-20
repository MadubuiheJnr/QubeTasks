import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfile } from "@/hooks/use-user";
import { profileSchema } from "@/lib/schema";
import type { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

export type ProfileFormData = z.infer<typeof profileSchema>;

export const ManageProfileDrawer = ({
  user,
  isOpen,
  onOpenChange,
}: {
  user: User;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [name, setName] = useState<string>(user?.name);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
    },
    values: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
    },
  });

  const { mutate: updateUserProfile, isPending } = useUpdateUserProfile();

  const handleProfileFormSubmit = (values: ProfileFormData) => {
    updateUserProfile(
      { name: values.name, profilePicture: values.profilePicture || "" },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          onOpenChange(false);
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.error || "Failed to update profile";
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Manage Profile</DrawerTitle>
          <DrawerDescription>
            Update your full name below. Your email address is linked to your
            account and cannot be changed
          </DrawerDescription>
        </DrawerHeader>

        <Card className="shadow-none! border-0">
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleProfileFormSubmit)}
              >
                <div>
                  <Avatar className="size-25 bg-gray-600">
                    <AvatarImage src={user?.profilePicture} alt={user?.name} />
                    <AvatarFallback className="text-4xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-primary">Email Address</FormLabel>
                  <Input value={user?.email} disabled />
                  <FormMessage />
                </FormItem>

                <DrawerFooter>
                  <Button className="w-full" disabled={isPending}>
                    Submit
                  </Button>
                  <DrawerClose>
                    <Button
                      variant={"outline"}
                      className="w-full"
                      type="button"
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DrawerContent>
    </Drawer>
  );
};
