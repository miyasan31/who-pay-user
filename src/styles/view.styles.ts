import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
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
	top: {
		flex: 4,
		width: "100%",
	},
	bottom: {
		flex: 6,
		width: "100%",
	},
	fixed: {
		position: "absolute",
		top: "30%",

		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		width: "90%",
		minHeight: 200,
		paddingHorizontal: 20,
		paddingVertical: 50,
		borderRadius: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 1,
	},
});
