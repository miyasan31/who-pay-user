import type { VFC } from "react";
import React, { useCallback } from "react";
import { ColorButton, Text } from "src/components/custom";
import { AuthLayout } from "src/components/layout";
import { buttonStyles, textStyles } from "src/styles";
import type { AuthScreenProps } from "types";

export const SigninActionScreen: VFC<AuthScreenProps<"SigninAction">> = (
	props
) => {
	const onNavigate = useCallback(
		(screen: "Signin" | "Signup") => {
			props.navigation.navigate(screen);
		},
		[props]
	);

	return (
		<AuthLayout>
			<Text style={textStyles.title}>WhoPAYへようこそ</Text>
			<Text style={textStyles.subtitle}>
				今までにない決済体験をご提案します
			</Text>

			<ColorButton
				title="サインイン"
				outlineStyle={buttonStyles.outline}
				onPress={() => onNavigate("Signin")}
			/>
			<ColorButton
				title="サインアップ"
				outlineStyle={buttonStyles.outline}
				onPress={() => onNavigate("Signup")}
			/>
		</AuthLayout>
	);
};
