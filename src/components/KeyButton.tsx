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

export const KeyButton: VFC<Porps> = memo((props) => {
	const color = useThemeColor({}, "text2");
	const backGroundColor = useThemeColor({}, "bg2");

	return (
		<ColorButton
			lightTextColor={color}
			darkTextColor={color}
			lightBgColor={backGroundColor}
			darkBgColor={backGroundColor}
			outlineStyle={styles.keyOutline}
			bgStyle={styles.keyBg}
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
		width: "96%",
		height: 90,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	keyText: {
		fontSize: 30,
	},
});
