import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { authRequestFetcher } from "src/functions/fetcher";
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
        phone: "81" + body.phone,
        password: hashedPassword,
      };
      const { statusCode } = await authRequestFetcher(
        "/auth/signup/phone",
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

      toast.success("確認コードを送信しました", {
        id: toastId,
        icon: "🙆‍♂️",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      props.navigation.navigate("Verify", { phone: body.phone });
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
        電話番号
      </Text>

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
      {errors.phone && <ErrorMessage message={errors.phone.message} />}

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
        title="確認コードを受け取る"
        outlineStyle={buttonStyles.outline}
        // eslint-disable-next-line react/jsx-handler-names
        onPress={handleSubmit(onSubmitPress)}
      />
    </>
  );
};
