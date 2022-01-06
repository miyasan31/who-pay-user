import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { requestFetcher } from "src/functions/fetcher";
import { saveSequreStore } from "src/functions/store";
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const toastId = toast.loading("処理中...", {
        icon: "💁‍♂️",
      });

      const hashedPassword = sha512(body.password);
      const requestBody = {
        phoneOrEmail: select === "phone" ? "81" + body.phone : body.email,
        password: hashedPassword,
        key: select,
      };
      const { statusCode, response } = await requestFetcher<User>(
        "/auth/signin/user",
        requestBody,
        "POST"
      );

      if (statusCode >= 400) {
        toast.error("エラーが発生しました", {
          id: toastId,
          icon: "🤦‍♂️",
        });
        return;
      }

      toast.success("サインインしました", {
        duration: 1500,
        id: toastId,
        icon: "🙆‍♂️",
      });
      await new Promise((resolve) => setTimeout(resolve, 400));

      await saveSequreStore("access_token", response.token);
      setUserInfo((prev) => ({
        ...prev,
        isSignin: true,
      }));
    },
    [select]
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
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              bgStyle={textInputStyles.bg}
              onChangeText={onChange}
              value={value}
              placeholder=""
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
              placeholder=""
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
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder=""
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      <ColorButton
        title="サインイン"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </AuthLayout>
  );
};
