import type { VFC } from "react";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components/custom";
import { buttonStyles } from "src/styles/button.styles";
import type { PaymentScreenProps } from "types";

export const PaymentListScreen: VFC<PaymentScreenProps<"PaymentList">> = (
	props
) => {
	const onNavigation = useCallback(() => {
		props.navigation.navigate("PaymentDetail");
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>PaymentListScreen</Text>

			<ColorButton
				outlineStyle={buttonStyles.outline}
				title="詳細ページへ"
				onPress={onNavigation}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
