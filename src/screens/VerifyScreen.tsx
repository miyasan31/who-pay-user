import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { user } from "src/atom";
import { AuthLayout } from "src/components/AuthLayout";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { ErrorMessage } from "src/components/ErrorMessage";
import { requestFetcher } from "src/functions/fetcher";
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
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const { phone } = props.route.params;
	const onSubmitPress = useCallback(
		async (body: FormDataType) => {
			const toastId = toast.loading("処理中...", {
				icon: "💁‍♂️",
			});

			const requestBody = { phone: "81" + phone, token: body.verifyCode };
			const { statusCode, response } = await requestFetcher<VerifyAuth>(
				"/auth/verify",
				requestBody,
				"POST"
			);
			if (statusCode >= 400) {
				toast("エラーが発生しました", {
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
				token: response.access_token,
			}));
			setIsCertified(true);
			props.navigation.navigate("UserInfoRegister", {
				phone: phone,
			});
		},
		[props]
	);

	const onNavigate = useCallback(() => {
		props.navigation.navigate("UserInfoRegister", {
			phone: phone,
		});
	}, []);

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
				title={isCertified ? "登録へ進む" : "送信"}
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={isCertified ? onNavigate : handleSubmit(onSubmitPress)}
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

// {
//   "phone": "8108027120301",
//   "result":  {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjM4NzY1MTk3LCJzdWIiOiI5YzcyNjEwZS03ZDM2LTQyZTAtODY5MC03MDdhMWE3OTE5YTIiLCJlbWFpbCI6IiIsInBob25lIjoiODEwODAyNzEyMDMwMSIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6InBob25lIiwicHJvdmlkZXJzIjpbInBob25lIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.Yjn2xozX97k1uzow-wO9HXEMyVdrNj0-ImbiEYfUyy0",
//     "expires_in": 3600,
//     "refresh_token": "MWjOy7hMIMhhiH-OsqGHRQ",
//     "token_type": "bearer",
//     "user": null,
// }
