import type React from "react";

import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";

interface Props {
  children: React.ReactNode;
}

const IsLogin = ({ children }: Props) => {
  const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
  const { isError } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/");
    }
  }, [userInfo]);

  return <div>{children}</div>;
};

export default IsLogin;
