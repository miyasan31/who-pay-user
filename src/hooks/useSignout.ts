import { useCallback } from "react";
import { Alert } from "react-native";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { SEQURE_TOKEN_KEY } from "src/constants";
import {
  deleteSequreStore,
  getSequreStore,
  requestFetcher,
  ToastKit,
} from "src/functions";

export const useSignout = () => {
  const setUserInfo = useSetRecoilState(user);

  const onSignoutDialog = useCallback(() => {
    Alert.alert("本当によろしいですか？", "", [
      {
        text: "キャンセル",
      },
      { text: "サインアウト", onPress: onSignout },
    ]);
  }, []);

  const onSignout = useCallback(async () => {
    const { ErrorToast, SuccessToast } = ToastKit();

    const tokenResult = await getSequreStore(SEQURE_TOKEN_KEY);
    const { statusCode } = await requestFetcher(
      "/auth/signout",
      { token: tokenResult },
      "POST"
    );
    if (statusCode >= 400) return ErrorToast("エラーが発生しました");
    SuccessToast("サインアウトしました", 1500);

    await new Promise((resolve) => setTimeout(resolve, 400));
    await deleteSequreStore(SEQURE_TOKEN_KEY);
    setUserInfo({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      token: "",
      isSignin: false,
    });
  }, []);

  return { onSignoutDialog };
};
