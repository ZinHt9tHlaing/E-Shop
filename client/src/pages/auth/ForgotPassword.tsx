import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type z from "zod";
import { forgotPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useForgotPasswordMutation } from "@/store/slices/api/userApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type formInput = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  console.log(userInfo);

  const form = useForm<formInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await forgotPasswordMutation(data).unwrap();
      form.reset();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Login error", error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <section className="flex h-[65vh] justify-center items-center mt-10">
      <div className="w-2/3 md:w-1/3 mx-auto border-2 border-gray-300 p-8 rounded-md">
        <h2 className="font-bold text-center mb-2">E-SHOP.COM</h2>
        <p className="text-sm font-medium text-gray-400 text-center">
          Enter your email get password reset mail.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mt-6 space-y-4"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@eshop.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Sending reset link...</span>
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPassword;
