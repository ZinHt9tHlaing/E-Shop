import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { registerSchema } from "../../schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";

type formInput = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
          Enter your information to register.
        </p>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="mt-6 space-y-4"
        >
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-sm font-medium mb-4">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="your_username"
              {...register("username")}
              className="w-full text-sm border-2 border-gray-400 rounded-lg py-2 ps-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-2 focus:border-gray-500"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="register@eshop.com"
              {...register("email")}
              className="w-full text-sm border-2 border-gray-400 rounded-lg py-2 ps-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-2 focus:border-gray-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium mb-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              {...register("password")}
              className="w-full text-sm border-2 border-gray-400 rounded-lg py-2 ps-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-2 focus:border-gray-500"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer rounded-lg active:scale-95 duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin text-white size-5" />
                <span className="animate-pulse">Submitting...</span>
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
