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
import { Input } from "@/components/ui/input";
import { emailUpdateSchema } from "@/schema/userSchema";
import { useUpdateEmailMutation } from "@/store/slices/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface EmailUpdateFormProps {
  email: string;
}

type formInput = z.infer<typeof emailUpdateSchema>;

const EmailUpdateForm = ({ email }: EmailUpdateFormProps) => {
  const [updateEmailMutation, { isLoading }] = useUpdateEmailMutation();

  const form = useForm<z.infer<typeof emailUpdateSchema>>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email,
    },
  });

  const watchedEmail = form.watch("email");

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await updateEmailMutation(data).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Update email error", error);
    }
  };

  useEffect(() => {
    // Reset the form when email changes
    form.reset({ email });
  }, [email]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email address</CardTitle>
        <CardDescription>
          You can view or edit your email address here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-2/3 lg:w-1/3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@eshop.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={email === watchedEmail}
              className="cursor-pointer rounded-lg active:scale-95 duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-white size-5" />
                  <span className="animate-pulse">Submitting...</span>
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

export default EmailUpdateForm;
