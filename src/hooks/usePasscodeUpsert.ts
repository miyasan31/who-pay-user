import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "src/atoms";
import { requestFetcher, ToastKit } from "src/functions";
import type { PasscodeScreenProps } from "types";

type Props = PasscodeScreenProps<"Passcode" | "PasscodeUpdate"> & {
  screen: "Passcode" | "PasscodeUpdate";
};

export const usePasscodeUpsert = (props: Props) => {
  const userInfo = useRecoilValue(user);
  const [passcode, setPasscode] = useState({
    isVerify: false,
    input: "",
    verify: "",
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const result = passcode.isVerify ? "verify" : "input";
  const secretView = "●".repeat(passcode[result].length);

  const onKeyPress = useCallback(
    (number?: string) => {
      setPasscode((prevPrice) => {
        if (prevPrice[result].length === 4) return prevPrice;
        if (number && prevPrice[result] === "" && ["00"].includes(number))
          return prevPrice;
        return {
          ...prevPrice,
          [result]: prevPrice[result] + number,
        };
      });
    },
    [result]
  );

  const onDeletePress = useCallback(() => {
    setPasscode((prevPrice) => {
      return {
        ...prevPrice,
        [result]: prevPrice[result].slice(0, -1),
      };
    });
  }, [result]);

  const onSubmitPress = useCallback(() => {
    if (error.isError) {
      setError({
        isError: false,
        message: "",
      });
    }

    // １回目のパスコード入力チェック
    if (!passcode.isVerify) {
      if (passcode.input.length !== 4) {
        return setError({
          isError: true,
          message: "４桁入力してください",
        });
      }
      return setPasscode((prev) => ({ ...prev, isVerify: true }));
    }

    // ２回目のパスコード入力チェック
    if (passcode.verify.length !== 4) {
      return setError({
        isError: true,
        message: "４桁入力してください",
      });
    }

    // パスコード照合
    if (passcode.input !== passcode.verify) {
      setError({
        isError: true,
        message: "パスコードが一致しません",
      });
      return setPasscode((prev) => ({ ...prev, verify: "" }));
    }

    // パスコード更新
    onPasscodeUpsert();
  }, [passcode, error]);

  // 更新処理
  const onPasscodeUpsert = useCallback(async () => {
    const { ErrorToast, SuccessToast } = ToastKit();

    const { statusCode } = await requestFetcher(
      `/user/${userInfo.id}`,
      { passcode: passcode.verify },
      "PUT"
    );

    if (statusCode >= 400)
      return ErrorToast(
        `パスコードの${
          props.screen === "Passcode" ? "登録" : "更新"
        }に失敗しました`
      );
    SuccessToast(
      `パスコードを${props.screen === "Passcode" ? "登録" : "更新"}しました`,
      1500
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    props.navigation.navigate("PasscodeSettingSelect");
  }, [props, userInfo, passcode]);

  return {
    error,
    passcode,
    secretView,
    onKeyPress,
    onDeletePress,
    onSubmitPress,
  };
};
