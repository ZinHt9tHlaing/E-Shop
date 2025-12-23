import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { registerSchema } from "../../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

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
import { useRegisterMutation } from "@/store/slices/api/userApi";
import { toast } from "sonner";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useEffect } from "react";

type formInput = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const form = useForm<formInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<formInput> = async (data) => {
    try {
      await registerMutation(data).unwrap();
      form.reset();
      toast.success("User registered successfully.");
      navigate("/login");
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
          Enter your information to register.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mt-6 space-y-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="your_name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      required
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
                  <span className="animate-pulse">Submitting...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
