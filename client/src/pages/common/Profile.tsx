import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  useCurrentUserQuery,
  useUploadAvatarMutation,
} from "@/store/slices/api/userApi";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import SuspenseFallback from "../../components/loading/SuspenseFallback";
import NameUpdateForm from "@/components/profile/NameUpdateForm";
import PasswordUpdateForm from "@/components/profile/PasswordUpdateForm";

const Profile = () => {
  const { data: userInfo, refetch, isLoading } = useCurrentUserQuery();
  const [uploadAvatarMutation, { isLoading: isUploading }] =
    useUploadAvatarMutation();

  const [avatar, setAvatar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const imageOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      // 2 means the file has been fully read (DONE)
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    // Read the selected file and convert it to a base64 Data URL
    reader.readAsDataURL(e.target.files![0]);
  };

  const avatarUploadHandler = async () => {
    if (!avatar) {
      toast.warning("Please select your avatar first.");
      return;
    }

    try {
      await uploadAvatarMutation({ image_url: avatar });
      setAvatar(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      refetch(); // Update the user info
      toast.success("Avatar uploaded successfully.");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Upload Avatar error", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <SuspenseFallback />
      ) : (
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                You can upload own avatar and edit your information.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <Avatar className="size-12">
                  <AvatarImage
                    src={avatar ?? userInfo?.avatar?.[0]?.url ?? ""}
                  />
                  {!userInfo?.avatar?.[0]?.url && (
                    <AvatarFallback className="text-2xl">
                      {userInfo?.name.slice(0, 1)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Input
                  type="file"
                  accept="images/*"
                  onChange={imageOnChangeHandler}
                  ref={inputRef}
                  className="mt-2 cursor-pointer hover:ring-1 hover:ring-gray-500 active:ring-2 transition-transform duration-300"
                />
              </div>
              <Button
                onClick={avatarUploadHandler}
                disabled={isUploading || !avatar}
                className="cursor-pointer active:scale-90 duration-200"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin text-white size-5" />
                    <span className="animate-pulse">Uploading...</span>
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-4">
            <EmailUpdateForm email={userInfo!.email} />
            <NameUpdateForm name={userInfo!.name} />
          </div>
          <PasswordUpdateForm />
        </section>
      )}
    </>
  );
};

export default Profile;
