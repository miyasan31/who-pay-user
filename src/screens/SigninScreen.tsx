import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableWithoutFeedback } from "react-native";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atom";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { onKeyBoardClose } from "src/functions";
import { authRequestFetcher } from "src/functions/fetcher";
import { saveSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textInputStyles, textStyles, viewStyles } from "src/styles";
import type { AuthScreenProps } from "types";

type FormDataType = {
	phone: string;
	password: string;
};

export const SigninScreen: VFC<AuthScreenProps<"Signin">> = (props) => {
	const color = useThemeColor({}, "text2");
	const setShopInfo = useSetRecoilState(shop);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataType>();

	const onSubmitPress = useCallback(async (body: FormDataType) => {
		const requestBody = { phone: "81" + body.phone, password: body.password };
		const result = await authRequestFetcher("/auth/signin/shop", requestBody, "POST");
		console.info(result);
		if (result.status >= 400) {
			console.info("error");
		}
		await saveSequreStore("access_token", result.response.token);
		setShopInfo({
			id: result.response.id,
			shopName: result.response.shopName,
			email: result.response.email,
			phone: result.response.phone,
			token: result.response.token,
			isSignin: true,
		});
	}, []);

	const onNavigateSignup = useCallback(() => {
		props.navigation.navigate("Signup");
	}, [props]);

	return (
		<TouchableWithoutFeedback onPress={onKeyBoardClose}>
			<View style={viewStyles.semi}>
				<Text style={textStyles.title}>サインイン</Text>

				<Text lightTextColor={color} darkTextColor={color} style={textStyles.label}>
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
						<TextInput bgStyle={textInputStyles.bg} onChangeText={onChange} value={value} placeholder="" />
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
					rules={{
						required: {
							value: true,
							message: "必須入力項目です",
						},
					}}
					render={({ field: { onChange, value } }) => (
						<TextInput bgStyle={textInputStyles.bg} onChangeText={onChange} value={value} placeholder="" />
					)}
				/>
				{errors.password && <ErrorMessage message={errors.password.message} />}

				<ColorButton
					title="サインイン"
					outlineStyle={buttonStyles.outline}
					// eslint-disable-next-line react/jsx-handler-names
					onPress={handleSubmit(onSubmitPress)}
				/>

				<Text style={buttonStyles.register} onPress={onNavigateSignup}>
					アカウント作成はこちら
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};
