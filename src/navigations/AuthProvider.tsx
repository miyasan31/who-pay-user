import type { ReactNode, VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { user } from "src/atoms";
import { Progress } from "src/components";
import { SEQURE_TOKEN_KEY } from "src/constants";
import { getSequreStore, requestFetcher, saveSequreStore } from "src/functions";
import { AuthNavigator } from "src/screens/auth";
import type { User } from "types/fetcher";

type Props = {
  children: ReactNode;
};

export const AuthProvider: VFC<Props> = (props) => {
  const [isLoading, seIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(user);

  const listenAuthState = useCallback(async () => {
    const tokenResult = await getSequreStore(SEQURE_TOKEN_KEY);

    if (tokenResult) {
      const { statusCode, response } = await requestFetcher<User>("POST", "/auth/session/user", {
        token: tokenResult,
      });

      if (statusCode >= 400) {
        return toast("エラーが発生しました", {
          icon: "🤦‍♂️",
        });
      }

      await saveSequreStore(SEQURE_TOKEN_KEY, response.token);
      setUserInfo({ ...response, isSignin: true });
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    seIsLoading(false);
  }, []);

  const loadingFalse = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    seIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) seIsLoading(true);
    if (!userInfo.isSignin) listenAuthState();
    loadingFalse();
  }, [userInfo.isSignin]);

  if (isLoading) {
    return <Progress />;
  } else {
    return <>{userInfo.isSignin ? <>{props.children}</> : <AuthNavigator />}</>;
  }
};
