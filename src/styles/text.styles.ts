import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
	title: {
		paddingVertical: 15,
		fontSize: 25,
	},
	messageTitle: {
		paddingVertical: 30,
		fontSize: 25,
	},
	passCodeTitle: {
		paddingVertical: 30,
	},
	label: {
		paddingVertical: 10,
		fontSize: 15,
		textAlign: "left",
	},
	text: {
		paddingVertical: 10,
		fontSize: 22,
		textAlign: "left",
	},
	result: {
		paddingTop: 20,
	},
	error: {
		paddingTop: 5,
		lineHeight: 0,
		fontSize: 12,
		textAlign: "right",
	},
});
