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
import { useForgotPasswordMutation } from "@/hooks/use-auth";
import { forgotPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import z from "zod";

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error: any) => {
        const errMsg = error?.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
        console.log(error);

        setIsSuccess(false);
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen p-3">
      {/* <div className=" space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
          <p className="text-muted-foreground text-sm text-center">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        <Card className="max-w-md w-full">
          <CardHeader>
            <CardAction>
              <Link to="/sign-in" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-center mb-2">
                  Email Sent! Please check your inbox.
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  If you don't see the email, please check your spam folder.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Request Password Reset"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div> */}

      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          {!isSuccess && (
            <CardDescription>
              Enter your email to receive password reset instructions.
            </CardDescription>
          )}
          <CardAction>
            <Link
              to="/sign-in"
              className="text-sm font-light underline p-1 text-accent-foreground"
            >
              <span>Back to Sign In</span>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div>
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-center mb-2">
                Email Sent! Please check your inbox.
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                If you don't see the email, please check your spam folder.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Request Password Reset"
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

export default ForgotPassword;
