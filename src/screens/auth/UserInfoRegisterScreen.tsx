import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { user } from "src/atoms";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { EMAIL_RULE, PHONE_RULE, REQUIRE, SEQURE_TOKEN_KEY } from "src/constants";
import { requestFetcher, saveSequreStore, ToastKit } from "src/functions";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import { viewStyles } from "src/styles/view.styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
};

export const UserInfoRegisterScreen: VFC<AuthScreenProps<"UserInfoRegister">> = () => {
  const color = useThemeColor({}, "text2");
  const [userInfo, setUserInfo] = useRecoilState(user);

  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmitPress = useCallback(
    async (body: FormDataType) => {
      const { ErrorToast, SuccessToast } = ToastKit();

      const { statusCode, response } = await requestFetcher<User>("POST", "/auth/register/user", {
        ...body,
        id: userInfo.id,
        phone: body.phone || userInfo.phone,
        email: body.email || userInfo.email,
        token: userInfo.token,
      });

      if (statusCode >= 400) return ErrorToast("ユーザー情報の登録に失敗しました");
      SuccessToast("ユーザー情報を登録しました", 1500);

      await new Promise((resolve) => setTimeout(resolve, 400));

      await saveSequreStore(SEQURE_TOKEN_KEY, response.token);
      setUserInfo({ ...response, isSignin: true });
    },
    [userInfo, setUserInfo],
  );

  return (
    <AuthLayout>
      <Text style={textStyles.title}>お客様情報登録</Text>

      <View style={viewStyles.horizontal}>
        <View style={viewStyles.flex1}>
          <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
            姓
          </Text>
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            rules={REQUIRE}
            render={({ field: { onChange, value } }) => (
              <TextInput
                bgStyle={textInputStyles.half}
                onChangeText={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          {errors.firstName && <ErrorMessage message={errors.firstName.message} />}
        </View>

        <View style={viewStyles.space}></View>

        <View style={viewStyles.flex1}>
          <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
            名
          </Text>
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            rules={REQUIRE}
            render={({ field: { onChange, value } }) => (
              <TextInput
                bgStyle={textInputStyles.half}
                onChangeText={onChange}
                value={value}
                placeholder=""
              />
            )}
          />
          {errors.lastName && <ErrorMessage message={errors.lastName.message} />}
        </View>
      </View>

      <Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
        {userInfo.email ? "電話番号" : "メールアドレス"}
      </Text>
      {userInfo.email ? (
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
      ) : (
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={EMAIL_RULE}
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

      <ColorButton
        title="登録"
        outlineStyle={buttonStyles.outline}
        onPress={onSubmit(onSubmitPress)}
      />
    </AuthLayout>
  );
};
