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
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          You can upload own avatar and edit your information.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            accept="images/*"
            className="mt-2 cursor-pointer hover:ring-1 hover:ring-gray-500 active:scale-95 transition-transform duration-300"
          />
        </div>
        <Button className="cursor-pointer active:scale-90 duration-200">
          Upload
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile;
