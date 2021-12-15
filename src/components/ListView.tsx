import type { ReactNode, VFC } from "react";
import React, { memo } from "react";
import {
	StyleSheet,
	TouchableOpacity as NativeTouchableOpacity,
} from "react-native";
import { useThemeColor } from "src/hooks";
import type { StyleProps } from "types/style";

export type ColorButtonProps = StyleProps &
	NativeTouchableOpacity["props"] & {
		children: ReactNode;
		onPress: () => void;
	};

export const ListView: VFC<ColorButtonProps> = memo((props) => {
	const { bgStyle, lightBgColor, darkBgColor, ...otherProps } = props;

	const backgroundColor = useThemeColor(
		{ light: lightBgColor, dark: darkBgColor },
		"bg1"
	);

	return (
		<NativeTouchableOpacity
			style={[defaultStyles.bg, bgStyle, { backgroundColor }]}
			activeOpacity={0.4}
			{...otherProps}
		>
			{props.children}
		</NativeTouchableOpacity>
	);
});

const defaultStyles = StyleSheet.create({
	bg: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		padding: 5,
		margin: 5,

		// shadow
		// shadowColor: "#aaa",
		// shadowOffset: {
		// 	width: 0,
		// 	height: 2,
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 4,
		// elevation: 1,
	},
});
