import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { PASSWORD_RULE, PHONE_RULE } from "src/constants";
import { authRequestFetcher, ToastKit } from "src/functions";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";

type FormDataType = {
  phone: string;
  password: string;
};

export const SignupPhoneForm: VFC<any> = (props) => {
  const color = useThemeColor({}, "text2");

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const { ErrorToast, SuccessToast } = ToastKit();

      const { statusCode } = await authRequestFetcher("POST", "/auth/signup/phone", {
        phone: "81" + body.phone,
        password: sha512(body.password),
      });

      if (statusCode >= 400) return ErrorToast("認証に失敗しました");
      SuccessToast("確認コードを送信しました");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      props.navigation.navigate("Verify", { phone: body.phone });
    },
    [props],
  );

  return (
    <>
      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        電話番号
      </Text>

      <Controller
        control={control}
        name="phone"
        defaultValue=""
        rules={PHONE_RULE}
        render={({ field: { onChange, value } }) => (
          <TextInput
            bgStyle={textInputStyles.bg}
            onChangeText={onChange}
            value={value}
            placeholder="ハイフンなし"
          />
        )}
      />
      {errors.phone && <ErrorMessage message={errors.phone.message} />}

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        パスワード
      </Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={PASSWORD_RULE}
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
        title="確認コードを受け取る"
        outlineStyle={buttonStyles.outline}
        onPress={onSubmit(onSubmitPress)}
      />
    </>
  );
};
