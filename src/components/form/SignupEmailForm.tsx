import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { user } from "src/atoms";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { requestFetcher } from "src/functions/fetcher";
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
        email: body.email,
        password: hashedPassword,
      };
      const { statusCode, response } = await requestFetcher<VerifyAuth>(
        "/auth/signup/email",
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

      toast.success("認証が成功しました", {
        id: toastId,
        icon: "🙆‍♂️",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserInfo((prev) => ({
        ...prev,
        id: response.user.id,
        email: body.email,
        token: response.access_token,
      }));

      props.navigation.navigate("UserInfoRegister");
    },
    [props]
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
            placeholder=""
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
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder=""
            secureTextEntry
          />
        )}
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      <ColorButton
        title="サインアップ"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );
};
