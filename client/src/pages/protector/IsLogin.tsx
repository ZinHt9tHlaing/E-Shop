import type React from "react";

import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/store/slices/api/userApi";
import { clearUserInfo } from "@/store/slices/auth/auth";

interface Props {
  children: React.ReactNode;
}

const IsLogin = ({ children }: Props) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth?.userInfo);
  const { isError } = useCurrentUserQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/");
      dispatch(clearUserInfo());
    }
  }, [userInfo, isError]);

  return <div>{children}</div>;
};

export default IsLogin;
