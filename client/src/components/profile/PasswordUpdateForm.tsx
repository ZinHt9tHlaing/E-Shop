import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordUpdateSchema } from "@/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { PasswordInput } from "../auth/PasswordInput";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/store/slices/api/userApi";
import { Loader2 } from "lucide-react";

type formInput = z.infer<typeof passwordUpdateSchema>;

const PasswordUpdateForm = () => {
  const [updatePasswordMutation, { isLoading }] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchedNewPassword = form.watch("newPassword");
  const watchedConfirmPassword = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await updatePasswordMutation({
        oldPassword: data.oldPassword,
        newPassword: data.confirmPassword,
      }).unwrap();
      form.reset();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Update password error", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-2/3 md:w-1/3"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      inputMode="numeric"
                      autoComplete="off"
                      // minLength={8}
                      // maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      inputMode="numeric"
                      autoComplete="off"
                      // minLength={8}
                      // maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      inputMode="numeric"
                      autoComplete="off"
                      // minLength={8}
                      // maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                watchedNewPassword !== watchedConfirmPassword || isLoading
              }
              className="cursor-pointer rounded-lg active:scale-95 duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Updating...</span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordUpdateForm;
