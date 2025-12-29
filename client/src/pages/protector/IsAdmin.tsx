import type React from "react";

import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";

interface Props {
  children: React.ReactNode;
}

const IsAdmin = ({ children }: Props) => {
  const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
  const { data: user, isError, isLoading } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!userInfo || isError || user?.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, isError, user, navigate]);

  return <div>{children}</div>;
};

export default IsAdmin;
