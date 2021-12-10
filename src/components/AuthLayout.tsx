import type { ReactNode, VFC } from "react";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "src/components/custom";
import { onKeyBoardClose } from "src/functions";
import { useThemeColor } from "src/hooks";
import { viewStyles } from "src/styles";

type Props = {
	children: ReactNode;
};

export const AuthLayout: VFC<Props> = (props) => {
	const primary = useThemeColor({}, "primary");

	return (
		<TouchableWithoutFeedback onPress={onKeyBoardClose}>
			<View style={viewStyles.full}>
				<View lightBgColor={primary} darkBgColor={primary} style={viewStyles.top}></View>
				<View style={viewStyles.bottom}></View>

				<View style={viewStyles.fixed}>{props.children}</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
