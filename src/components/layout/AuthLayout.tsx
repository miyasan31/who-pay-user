import type { ReactNode, VFC } from "react";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { View } from "src/components/custom";
import { WhoPay } from "src/components/icon";
import { KeyboardAvoiding } from "src/components/layout/KeyboardAvoiding";
import { useThemeColor } from "src/hooks";

type Props = {
	tab?: ReactNode;
	children: ReactNode;
	overPositionStyle?: true;
};

export const AuthLayout: VFC<Props> = (props) => {
	const primary = useThemeColor({}, "primary");
	const bg0 = useThemeColor({}, "bg0");

	const positionStyle = useMemo(() => {
		return props.overPositionStyle
			? defaultStyle.position1
			: defaultStyle.position2;
	}, []);

	return (
		<KeyboardAvoiding>
			<View style={defaultStyle.full}>
				<View
					lightBgColor={primary}
					darkBgColor={primary}
					style={defaultStyle.twoToneTop}
				>
					<WhoPay />
				</View>
				<View style={defaultStyle.twoToneBottom} darkBgColor={bg0} />

				<View
					style={[positionStyle, defaultStyle.fixedLayout]}
					darkBgColor={bg0}
				>
					{props.tab}
					<View style={defaultStyle.mainLayout}>{props.children}</View>
				</View>
			</View>
		</KeyboardAvoiding>
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
		borderRadius: 20,

		shadowColor: "#aaa",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 1,
	},
	mainLayout: {
		paddingHorizontal: 20,
		paddingTop: 25,
		paddingBottom: 50,
		borderRadius: 20,
	},
});
