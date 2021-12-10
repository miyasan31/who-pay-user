import type { VFC } from "react";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { ColorButton } from "src/components/custom";
import { useThemeColor } from "src/hooks";

type Porps = {
	title?: string;
	children?: React.ReactNode;
	onPress: (number?: string) => void;
};

export const CircleKeyButton: VFC<Porps> = memo((props) => {
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg1");

	return (
		<ColorButton
			lightTextColor={color}
			darkTextColor={color}
			lightBgColor={backGroundColor}
			darkBgColor={backGroundColor}
			outlineStyle={styles.keyOutline}
			bgStyle={!props.children ? styles.keyBg : null}
			textStyle={styles.keyText}
			title={props.title}
			onPress={() =>
				props.title ? props.onPress(props.title) : props.onPress()
			}
		>
			{props.children}
		</ColorButton>
	);
});

const styles = StyleSheet.create({
	keyOutline: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "33%",
	},
	keyBg: {
		width: "70%",
		height: 80,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 9999,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	keyText: {
		fontSize: 30,
	},
});
