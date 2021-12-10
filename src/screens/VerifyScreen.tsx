import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atom";
import { AuthLayout } from "src/components/AuthLayout";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { authRequestFetcher } from "src/functions/fetcher";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";

type FormDataType = {
	verifyCode: string;
};

export const VerifyScreen: VFC<AuthScreenProps<"Verify">> = (props) => {
	const color = useThemeColor({}, "text2");
	const setShopInfo = useSetRecoilState(shop);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(
		async (body: FormDataType) => {
			const { phone } = props.route.params;
			const requestBody = { phone: "81" + phone, token: body.verifyCode };
			const result = await authRequestFetcher(
				"/auth/verify",
				requestBody,
				"POST"
			);
			if (result.status >= 400) {
				console.info("error");
				return;
			}
			setShopInfo((prev) => ({
				...prev,
				id: result.response.user.id,
				token: result.response.access_token,
			}));
			props.navigation.navigate("ShopInfoRegister", {
				phone: phone,
			});
		},
		[props]
	);

	return (
		<AuthLayout>
			<Text style={textStyles.title}>確認コード</Text>

			<Text
				lightTextColor={color}
				darkTextColor={color}
				style={textStyles.label}
			>
				パスワード
			</Text>
			<Controller
				control={control}
				name="verifyCode"
				defaultValue=""
				rules={{
					required: {
						value: true,
						message: "必須入力項目です",
					},
					minLength: {
						value: 6,
						message: "6桁の認証コードを入力してください",
					},
					maxLength: {
						value: 6,
						message: "6桁の認証コードを入力してください",
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
			{errors.verifyCode && (
				<ErrorMessage message={errors.verifyCode.message} />
			)}

			<ColorButton
				title="送信"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>
		</AuthLayout>
	);
};

// {
//   "phone": "8108027120301",
//   "result":  {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM4NzY1MTk3LCJzdWIiOiI5YzcyNjEwZS03ZDM2LTQyZTAtODY5MC03MDdhMWE3OTE5YTIiLCJlbWFpbCI6IiIsInBob25lIjoiODEwODAyNzEyMDMwMSIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6InBob25lIiwicHJvdmlkZXJzIjpbInBob25lIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.Yjn2xozX97k1uzow-wO9HXEMyVdrNj0-ImbiEYfUyy0",
//     "expires_in": 3600,
//     "refresh_token": "MWjOy7hMIMhhiH-OsqGHRQ",
//     "token_type": "bearer",
//     "user": null,
// }
