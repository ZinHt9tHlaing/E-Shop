import { useForgotPasswordMutation } from "@/store/slices/api/userApi";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

interface ResetPasswordProps {
  email: string;
}

function ResetPasswordForm({ email }: ResetPasswordProps) {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const resetPasswordHandler = async () => {
    try {
      const res = await forgotPasswordMutation({ email }).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
      console.error("Reset password error", err);
    }
  };

  return (
    <main className="flex items-center justify-center bg-muted/40 my-10 py-6 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background shadow-lg p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            We’ll send a password reset link to:
          </p>
          <p className="text-sm font-medium text-foreground break-all">
            {email}
          </p>
        </div>

        <Button
          onClick={resetPasswordHandler}
          disabled={isLoading}
          className="h-11 w-full cursor-pointer rounded-lg active:scale-95 duration-200"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending reset link...
            </span>
          ) : (
            "Send reset link"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </main>
  );
}

export default ResetPasswordForm;
