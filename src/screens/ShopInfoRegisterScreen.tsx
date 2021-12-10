import type { VFC } from "react";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableWithoutFeedback } from "react-native";
import { ErrorMessage } from "src/components";
import { ColorButton, Text, TextInput, View } from "src/components/custom";
import { onKeyBoardClose } from "src/functions";
import { useThemeColor } from "src/hooks";
import {
	buttonStyles,
	textInputStyles,
	textStyles,
	viewStyles,
} from "src/styles";
import type { AuthScreenProps } from "types";

type FormDataType = {
	shopName: string;
	address: string;
	email: string;
};

export const ShopInfoRegisterScreen: VFC<AuthScreenProps<"ShopInfoRegister">> =
	(props) => {
		const color = useThemeColor({}, "text2");

		const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm<FormDataType>();

		const onSubmitPress = useCallback(
			(body: FormDataType) => {
				const { phone } = props.route.params;
				props.navigation.navigate("ShopInfoVerification", {
					...body,
					phone: phone,
				});
			},
			[props]
		);

		return (
			<TouchableWithoutFeedback onPress={onKeyBoardClose}>
				<View style={viewStyles.semi}>
					<Text style={textStyles.title}>店舗情報登録</Text>

					<Text
						lightTextColor={color}
						darkTextColor={color}
						style={textStyles.label}
					>
						店舗名
					</Text>
					<Controller
						control={control}
						name="shopName"
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
					{errors.shopName && (
						<ErrorMessage message={errors.shopName.message} />
					)}

					<Text
						lightTextColor={color}
						darkTextColor={color}
						style={textStyles.label}
					>
						住所
					</Text>
					<Controller
						control={control}
						name="address"
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
					{errors.address && <ErrorMessage message={errors.address.message} />}

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
						title="確認画面へ"
						outlineStyle={buttonStyles.outline}
						// eslint-disable-next-line react/jsx-handler-names
						onPress={handleSubmit(onSubmitPress)}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};
