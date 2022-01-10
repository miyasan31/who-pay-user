import { useCallback, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
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

  const result = passcode.isVerify ? "verify" : "input";
  const secretView = "●".repeat(passcode[result].length);

  const onClick = useCallback(
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

  const onDelete = useCallback(() => {
    setPasscode((prevPrice) => {
      return {
        ...prevPrice,
        [result]: prevPrice[result].slice(0, -1),
      };
    });
  }, [result]);

  const onSubmit = useCallback(async () => {
    // １回目のパスコード入力
    if (!passcode.isVerify) {
      if (passcode.input.length !== 4) {
        return toast.error("４桁入力してください", {
          icon: "🤦‍♂️",
        });
      }
      return setPasscode((prev) => ({ ...prev, isVerify: true }));
    }

    // ２回目のパスコード入力
    if (passcode.verify.length !== 4) {
      return toast.error("４桁入力してください", {
        icon: "🤦‍♂️",
      });
    }

    // パスコード照合
    if (passcode.input !== passcode.verify) {
      toast.error("パスコードが一致しません", {
        icon: "🤦‍♂️",
      });
      return setPasscode((prev) => ({ ...prev, verify: "" }));
    }

    const { ErrorToast, SuccessToast } = ToastKit();

    const { statusCode } = await requestFetcher(
      `/user/${userInfo.id}`,
      { passcode: passcode.verify },
      "PUT"
    );

    if (statusCode >= 400) return ErrorToast("エラーが発生しました");
    SuccessToast(
      `パスコードを${props.screen === "Passcode" ? "登録" : "更新"}しました`,
      1500
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    props.navigation.navigate("PasscodeSettingSelect");
  }, [userInfo, passcode, props]);

  return {
    passcode,
    secretView,
    onClick,
    onDelete,
    onSubmit,
  };
};
