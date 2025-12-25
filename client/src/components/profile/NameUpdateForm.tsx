import { useEffect } from "react";

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
import { nameUpdateSchema } from "@/schema/userSchema";
import { useUpdateNameMutation } from "@/store/slices/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

interface NameUpdateFormProps {
  name: string;
}

type formInput = z.infer<typeof nameUpdateSchema>;

const NameUpdateForm = ({ name }: NameUpdateFormProps) => {
  const [updateNameMutation, { isLoading }] = useUpdateNameMutation();

  const form = useForm<z.infer<typeof nameUpdateSchema>>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: {
      name,
    },
  });

  const watchedName = form.watch("name");

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const response = await updateNameMutation(data).unwrap();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Update name error", error);
    }
  };

  useEffect(() => {
    // Reset the form when name changes
    form.reset({ name });
  }, [name]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile name</CardTitle>
        <CardDescription>
          You can view or edit your profile name here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-2/3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your_name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={name === watchedName || isLoading}
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

export default NameUpdateForm;
