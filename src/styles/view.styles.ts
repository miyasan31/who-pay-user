import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
	keyboard: {
		flex: 1,
	},
	full: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	semi: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		paddingHorizontal: "10%",
	},
	middle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		paddingHorizontal: "3%",
	},
	horizontal: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	flex1: {
		flex: 1,
	},
	space: {
		width: "5%",
	},
});
