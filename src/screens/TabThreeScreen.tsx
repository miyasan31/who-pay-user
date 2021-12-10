import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "src/components/custom";
import type { BottomTabScreenProps } from "types";

export const TabThreeScreen: VFC<BottomTabScreenProps<"TabThree">> = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Three</Text>
			<View
				style={styles.separator}
				lightBgColor="#eee"
				darkBgColor="rgba(255,255,255,0.1)"
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
