import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { SEQURE_TOKEN_KEY } from "src/constants";
import { requestFetcher, saveSequreStore, ToastKit } from "src/functions";
import { useTab, useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
  email?: string;
  phone?: string;
  password: string;
};

export const SigninScreen: VFC<AuthScreenProps<"Signin">> = () => {
  const color = useThemeColor({}, "text2");
  const { select, Tab } = useTab();
  const setUserInfo = useSetRecoilState(user);

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const { ErrorToast, SuccessToast } = ToastKit();

      const { statusCode, response } = await requestFetcher<User>(
        "/auth/signin/user",
        {
          phoneOrEmail: select === "phone" ? "81" + body.phone : body.email,
          password: sha512(body.password),
          key: select,
        },
        "POST"
      );

      if (statusCode >= 400) return ErrorToast("サインインに失敗しました");
      SuccessToast("サインインしました", 1500);

      await new Promise((resolve) => setTimeout(resolve, 400));
      await saveSequreStore(SEQURE_TOKEN_KEY, response.token);
      setUserInfo({ ...response, isSignin: true });
    },
    [select, setUserInfo]
  );

  return (
    <AuthLayout tab={<Tab />}>
      <Text
        lightTextColor={color}
        darkTextColor={color}
        style={textStyles.label}
      >
        {select === "phone" ? "電話番号" : "メールアドレス"}
      </Text>

      {select === "phone" ? (
        <Controller
          control={control}
          name="phone"
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "必須入力項目です",
            },
            minLength: {
              value: 11,
              message: "11桁で入力してください",
            },
            maxLength: {
              value: 11,
              message: "6桁の認証コードを入力してください",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              bgStyle={textInputStyles.bg}
              onChangeText={onChange}
              value={value}
              placeholder="ハイフンなし"
            />
          )}
        />
      ) : (
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
      )}
      {errors.phone && <ErrorMessage message={errors.phone.message} />}
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
        title="サインイン"
        outlineStyle={buttonStyles.outline}
        onPress={onSubmit(onSubmitPress)}
      />
    </AuthLayout>
  );
};
