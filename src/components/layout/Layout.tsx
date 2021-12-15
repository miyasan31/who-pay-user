import type { ReactNode, VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "src/components/custom";
import { KeyboardAvoiding } from "src/components/layout/KeyboardAvoiding";

type Props = {
	children: ReactNode;
};

export const Layout: VFC<Props> = (props) => {
	return (
		<KeyboardAvoiding>
			<SafeAreaView style={defaultStyle.full}>{props.children}</SafeAreaView>
		</KeyboardAvoiding>
	);
};

const defaultStyle = StyleSheet.create({
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
});
