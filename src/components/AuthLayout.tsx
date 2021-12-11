import type { ReactNode, VFC } from "react";
import React, { useMemo } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import { View } from "src/components/custom";
import { WhoPayHorizontal } from "src/components/icon";
import { onKeyBoardClose } from "src/functions";
import { useThemeColor } from "src/hooks";
import { viewStyles } from "src/styles";

type Props = {
	children: ReactNode;
	overPositionStyle?: true;
};

export const AuthLayout: VFC<Props> = (props) => {
	const primary = useThemeColor({}, "primary");

	const positionStyle = useMemo(() => {
		return props.overPositionStyle
			? defaultStyle.position1
			: defaultStyle.position2;
	}, []);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={viewStyles.keyboard}
		>
			<TouchableWithoutFeedback onPress={onKeyBoardClose}>
				<View style={defaultStyle.full}>
					<View
						lightBgColor={primary}
						darkBgColor={primary}
						style={defaultStyle.twoToneTop}
					>
						<WhoPayHorizontal />
					</View>
					<View style={defaultStyle.twoToneBottom}></View>

					<View style={[positionStyle, defaultStyle.fixedLayout]}>
						{props.children}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const defaultStyle = StyleSheet.create({
	full: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	twoToneTop: {
		flex: 4,
		alignItems: "center",
		justifyContent: "center",

		width: "100%",
	},
	twoToneBottom: {
		flex: 6,
		width: "100%",
	},
	position1: {
		position: "absolute",
		top: "28%",
	},
	position2: {
		position: "absolute",
		top: "30%",
	},
	fixedLayout: {
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
