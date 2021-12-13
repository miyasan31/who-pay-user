import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilState } from "recoil";
import { user } from "src/atom/index";
import { ErrorMessage } from "src/components";
import { AuthLayout } from "src/components/AuthLayout";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { requestFetcher } from "src/functions/fetcher/requestFetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import { viewStyles } from "src/styles/view.styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
	firstName: string;
	lastName: string;
	email: string;
};

export const UserInfoRegisterScreen: VFC<AuthScreenProps<"UserInfoRegister">> =
	(props) => {
		const color = useThemeColor({}, "text2");
		const [userInfo, setUserInfo] = useRecoilState(user);

		const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<FormDataType>();

		const onSubmitPress = useCallback(async (body: FormDataType) => {
			const toastId = toast.loading("処理中...", {
				icon: "💁‍♂️",
			});

			const { phone } = props.route.params;
			const requestBody = {
				...body,
				id: userInfo.id,
				phone: phone,
				token: userInfo.token,
			};
			const { statusCode, response } = await requestFetcher<User>(
				"/auth/register/user",
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

			toast.success("ユーザー情報を登録しました", {
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
		}, []);

		return (
			<AuthLayout>
				<Text style={textStyles.title}>お客様情報登録</Text>

				<View style={viewStyles.horizontal}>
					<View style={viewStyles.flex1}>
						<Text
							lightTextColor={color}
							darkTextColor={color}
							style={textStyles.label}
						>
							姓
						</Text>
						<Controller
							control={control}
							name="firstName"
							defaultValue=""
							rules={{
								required: {
									value: true,
									message: "必須入力項目です",
								},
							}}
							render={({ field: { onChange, value } }) => (
								<TextInput
									bgStyle={textInputStyles.half}
									onChangeText={onChange}
									value={value}
									placeholder=""
								/>
							)}
						/>
						{errors.firstName && (
							<ErrorMessage message={errors.firstName.message} />
						)}
					</View>

					<View style={viewStyles.space}></View>

					<View style={viewStyles.flex1}>
						<Text
							lightTextColor={color}
							darkTextColor={color}
							style={textStyles.label}
						>
							名
						</Text>
						<Controller
							control={control}
							name="lastName"
							defaultValue=""
							rules={{
								required: {
									value: true,
									message: "必須入力項目です",
								},
							}}
							render={({ field: { onChange, value } }) => (
								<TextInput
									bgStyle={textInputStyles.half}
									onChangeText={onChange}
									value={value}
									placeholder=""
								/>
							)}
						/>
						{errors.lastName && (
							<ErrorMessage message={errors.lastName.message} />
						)}
					</View>
				</View>

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

				<ColorButton
					title="登録"
					outlineStyle={buttonStyles.outline}
					// eslint-disable-next-line react/jsx-handler-names
					onPress={handleSubmit(onSubmitPress)}
				/>
			</AuthLayout>
		);
	};
