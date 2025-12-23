import { loginSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import type z from "zod";

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

type formInput = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const form = useForm<formInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<formInput> = async (data) => {
    console.log("data", data);
  };

  return (
    <section className="flex h-[65vh] justify-center items-center mt-10">
      <div className="w-2/3 md:w-1/3 mx-auto border-2 border-gray-300 p-8 rounded-md">
        <h2 className="font-bold text-center mb-2">E-SHOP.COM</h2>
        <p className="text-sm font-medium text-gray-400 text-center">
          Enter your information to login.
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Submitting...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
