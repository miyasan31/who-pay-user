import sha512 from "js-sha512";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast/src/core/toast";
import { useSetRecoilState } from "recoil";
import { user } from "src/atom";
import { ErrorMessage } from "src/components";
import { AuthLayout } from "src/components/AuthLayout";
import { ColorButton, Text, TextInput } from "src/components/custom";
import { requestFetcher } from "src/functions/fetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";
import type { User } from "types/fetcher";

type FormDataType = {
	phone: string;
	password: string;
};

export const SigninScreen: VFC<AuthScreenProps<"Signin">> = () => {
	const color = useThemeColor({}, "text2");
	const setUserInfo = useSetRecoilState(user);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(async (body: FormDataType) => {
		const toastId = toast.loading("処理中...", {
			icon: "💁‍♂️",
		});

		const hashedPassword = sha512(body.password);
		const requestBody = { phone: "81" + body.phone, password: hashedPassword };
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
	}, []);

	return (
		<AuthLayout>
			<Text style={textStyles.title}>サインイン</Text>

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
				title="サインイン"
				outlineStyle={buttonStyles.outline}
				// eslint-disable-next-line react/jsx-handler-names
				onPress={handleSubmit(onSubmitPress)}
			/>
		</AuthLayout>
	);
};
