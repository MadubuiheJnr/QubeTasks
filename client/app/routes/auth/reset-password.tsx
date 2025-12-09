import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/hooks/use-auth";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import z from "zod";

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!token) {
      return toast.error("Invalid or missing token");
    }

    resetPassword(
      { ...values, token: token as string },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const errMsg =
            error?.response?.data?.message || "Something went wrong";
          toast.error(errMsg);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`${isSuccess && "text-center"}`}>
            Reset Your Password
          </CardTitle>

          {!isSuccess && (
            <>
              <CardDescription>
                Please enter your new password below.
              </CardDescription>
              <CardAction>
                <Link
                  to="/sign-in"
                  className="text-accent-foreground text-base font-light underline p-1"
                >
                  Sign in
                </Link>
              </CardAction>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div>
              <CheckCircle className="mx-auto mb-4 w-10 h-10 text-green-500" />
              <h2 className="text-center text-base font-semibold">
                Password Reset Successful
              </h2>
              <p className="text-center text-sm text-muted-foreground">
                You can now sign in with your new password.
              </p>
              <Button className="w-full mt-4">
                <Link to="/sign-in" className="flex items-center gap-2">
                  Sign In
                </Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
