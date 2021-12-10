import { AntDesign } from "@expo/vector-icons";
import type { VFC } from "react";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import {
	Button,
	ColorButton,
	Text,
	TextInput,
	View,
} from "src/components/custom";
import { useColorScheme } from "src/hooks";
import { theme } from "src/styles";
import type { BottomTabScreenProps } from "types";

export const ExampleScreen: VFC<BottomTabScreenProps<"TabOne">> = () => {
	const colorScheme = useColorScheme();
	const [state, setState] = useState("");

	const onChangeText = useCallback((text) => {
		setState(text);
	}, []);

	const onClick = () => {
		console.info("onClick");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
			<View
				style={styles.separator}
				lightTextColor="#eee"
				darkTextColor="rgba(255,255,255,0.1)"
			/>

			<TextInput
				bgStyle={styles.inputWrap}
				onChangeText={(text: string) => onChangeText(text)}
				value={state}
				placeholder="電話番号入力"
			/>

			<Button
				lightTextColor="#4882ff"
				darkTextColor="#ff8c00"
				title="ボタン"
				onPress={onClick}
			/>

			<ColorButton
				textStyle={styles.buttonLabel}
				lightTextColor="#ffffff"
				darkTextColor="#ffffff"
				bgStyle={styles.button}
				lightBgColor="#4882ff"
				darkBgColor="#ff8c00"
				onPress={onClick}
				title="ボタン"
			/>

			<ColorButton
				textStyle={styles.buttonLabel}
				lightTextColor="#ffffff"
				darkTextColor="#ffffff"
				bgStyle={styles.button}
				lightBgColor="#4882ff"
				darkBgColor="#ff8c00"
				onPress={onClick}
				title="アイコンボタン"
			>
				<AntDesign
					name="pluscircle"
					size={25}
					color={theme[colorScheme].icon1}
					style={{ marginRight: 10 }}
				/>
			</ColorButton>
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
	inputWrap: {
		minWidth: "80%",
		padding: 10,
		borderRadius: 10,
	},
	buttonLabel: {
		fontSize: 20,
	},
	button: {
		// boxShadow
		shadowColor: "#656565a2",
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 5,
		shadowOpacity: 0.6,
	},
});
