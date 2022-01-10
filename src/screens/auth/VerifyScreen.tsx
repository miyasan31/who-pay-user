import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { AuthLayout } from "src/components/layout";
import { VERIFY_RULE } from "src/constants";
import { requestFetcher, ToastKit } from "src/functions";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { VerifyAuth } from "types/fetcher";

type FormDataType = {
  verifyCode: string;
};

export const VerifyScreen: VFC<AuthScreenProps<"Verify">> = (props) => {
  const color = useThemeColor({}, "text2");
  const setUserInfo = useSetRecoilState(user);
  const [isCertified, setIsCertified] = useState(false);

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const { ErrorToast, SuccessToast } = ToastKit();

      const { phone } = props.route.params;
      const { statusCode, response } = await requestFetcher<VerifyAuth>(
        "/auth/verify",
        {
          phone: "81" + phone,
          token: body.verifyCode,
        },
        "POST"
      );

      if (statusCode >= 400) return ErrorToast("認証に失敗しました");
      SuccessToast("認証が成功しました");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsCertified(true);
      setUserInfo((prev) => ({
        ...prev,
        id: response.user.id,
        phone: phone,
        token: response.access_token,
      }));
      props.navigation.navigate("UserInfoRegister");
    },
    [props, setUserInfo]
  );

  const onNavigate = useCallback(() => {
    props.navigation.navigate("UserInfoRegister");
  }, [props]);

  return (
    <AuthLayout>
      <Text style={textStyles.title}>確認コード</Text>

      <Text
        lightTextColor={color}
        darkTextColor={color}
        style={textStyles.label}
      >
        ６桁の番号を入力してください
      </Text>
      <Controller
        control={control}
        name="verifyCode"
        defaultValue=""
        rules={VERIFY_RULE}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder=""
          />
        )}
      />
      {errors.verifyCode && (
        <ErrorMessage message={errors.verifyCode.message} />
      )}

      <ColorButton
        title={isCertified ? "登録へ進む" : "送信"}
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={isCertified ? onNavigate : onSubmit(onSubmitPress)}
      />
      {isCertified ? (
        <Text
          lightTextColor={color}
          darkTextColor={color}
          style={textStyles.error}
        >
          登録済みです
        </Text>
      ) : null}
    </AuthLayout>
  );
};
