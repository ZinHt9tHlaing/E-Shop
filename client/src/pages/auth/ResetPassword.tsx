import {  useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type z from "zod";
import { resetPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PasswordInput } from "@/components/auth/PasswordInput";
import {
  useLogoutMutation,
  useResetPasswordMutation,
} from "@/store/slices/api/userApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { clearUserInfo } from "@/store/slices/auth/auth";

type formInput = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();

  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<formInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await resetPasswordMutation({
        newPassword: data.newPassword,
        token: params.token!,
      }).unwrap();
      await logoutMutation({});
      dispatch(clearUserInfo());
      form.reset();
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Reset password error", error);
    }
  };

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate("/");
  //     }
  //   }, [navigate, userInfo]);

  return (
    <section className="flex h-[65vh] justify-center items-center mt-10">
      <div className="w-2/3 md:w-1/3 mx-auto border-2 border-gray-300 p-8 rounded-md">
        <h2 className="font-bold text-center mb-2">Reset password</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mt-6 space-y-4"
          >
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
              disabled={isLoading}
              className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Changing...</span>
                </>
              ) : (
                "Change password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ResetPassword;
