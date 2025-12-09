import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { CheckCircle, Loader, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setIsSuccess(false);
    } else {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errMsg =
              error?.response?.data?.message || "An error occurred";
            setIsSuccess(false);
            console.log(error);
            toast.error(errMsg);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-primary">
      <Card className="mt-6 p-6 max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-xl font-bold mb-2">
            Verify Email Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {isVerifying ? (
              <>
                <Loader
                  className="mx-auto text-primary animate-spin"
                  size={35}
                />
                <p className="text-primary font-semibold">
                  Verifying your email...
                </p>
                <p className="text-muted-foreground text-sm">
                  This may take a few moments. Please do not close this page.
                </p>
              </>
            ) : isSuccess ? (
              <div className=" space-y-1">
                <CheckCircle className="mx-auto text-green-600" size={30} />
                <p className="text-sm font-bold text-primary">
                  Email verified!
                </p>
                <p className="text-sm text-muted-foreground">
                  Your email has been successfully verified.
                </p>
              </div>
            ) : (
              <div className=" space-y-1">
                <XCircle className="mx-auto text-red-600" size={30} />
                <p className="text-sm font-bold text-primary">
                  Email verification Failed
                </p>
                <p className="text-sm text-muted-foreground">
                  Your email verification failed. Please try again
                </p>
              </div>
            )}
          </div>
        </CardContent>
        {!isVerifying && (
          <CardFooter className="flex items-center justify-center">
            <Button className="group">
              <Link
                to="/sign-in"
                className="text-sm group-hover:underline transition-all duration-300 ease-in-out"
              >
                Back to sign in
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;
