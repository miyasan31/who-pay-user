import type { VFC } from "react";
import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components/custom";
import { buttonStyles } from "src/styles/button.styles";
import type { SettingScreenProps } from "types";

export const SettingScreen: VFC<SettingScreenProps<"Setting">> = (props) => {
	const onNavigation = useCallback(() => {
		props.navigation.navigate("Passcode");
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>SettingScreen</Text>

			<ColorButton
				outlineStyle={buttonStyles.outline}
				title="一覧ページへ"
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
