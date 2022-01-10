import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { requestFetcher, ToastKit } from "src/functions";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { VerifyAuth } from "types/fetcher";

type FormDataType = {
  email: string;
  password: string;
};

export const SignupEmailForm: VFC<any> = (props) => {
  const color = useThemeColor({}, "text2");
  const setUserInfo = useSetRecoilState(user);

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const { ErrorToast, SuccessToast } = ToastKit();

      const { statusCode, response } = await requestFetcher<VerifyAuth>(
        "/auth/signup/email",
        {
          email: body.email,
          password: sha512(body.password),
        },
        "POST"
      );

      if (statusCode >= 400) return ErrorToast("認証に失敗しました");
      SuccessToast("認証が成功しました");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserInfo((prev) => ({
        ...prev,
        id: response.user.id,
        email: body.email,
        token: response.access_token,
      }));

      props.navigation.navigate("UserInfoRegister");
    },
    [props, setUserInfo]
  );

  return (
    <>
      <Text
        lightTextColor={color}
        darkTextColor={color}
        style={textStyles.label}
      >
        メールアドレス
      </Text>

      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "必須入力項目です",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "メールアドレスの形式が正しくありません",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder="example@co.jp"
          />
        )}
      />
      {errors.email && <ErrorMessage message={errors.email.message} />}

      <Text
        lightTextColor={color}
        darkTextColor={color}
        style={textStyles.label}
      >
        パスワード
      </Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: "必須入力項目です",
          },
          minLength: {
            value: 8,
            message: "パスワードは8文字以上です",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "パスワードは半角英数字です",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder="8文字以上の半角英数字"
            secureTextEntry
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      <ColorButton
        title="サインアップ"
        outlineStyle={buttonStyles.outline}
        onPress={onSubmit(onSubmitPress)}
      />
    </>
  );
};
