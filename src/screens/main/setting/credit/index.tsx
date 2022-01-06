import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import type { CreditScreenProps, CreditStackParamList } from "types";

import { CreditScreen } from "./CreditScreen";
import { CreditUpdateScreen } from "./CreditUpdateScreen";

type Option = CreditScreenProps<"Credit" | "CreditUpdate">;
type PrevProps = Option & {
	screen: "Credit" | "SettingSelect";
};

const Credit = createNativeStackNavigator<CreditStackParamList>();

export const CreditNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<Credit.Navigator
			initialRouteName="Credit"
			screenOptions={() => ({
				headerBackTitle: "一覧",
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			})}
		>
			<Credit.Screen
				name="Credit"
				component={CreditScreen}
				options={(options: Option) => ({
					title: "クレジットカード情報",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<Credit.Screen
				name="CreditUpdate"
				component={CreditUpdateScreen}
				options={(options: Option) => ({
					title: "クレジットカード更新",
					headerLeft: () => <PrevButton {...options} screen="Credit" />,
				})}
			/>
		</Credit.Navigator>
	);
};

const PrevButton: VFC<PrevProps> = (props) => {
	const icon1 = useThemeColor({}, "icon1");

	const onPrevScreen = useCallback((navigation) => {
		navigation.navigate(props.screen);
	}, []);

	return (
		<Pressable
			onPress={() => onPrevScreen(props.navigation)}
			style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
		>
			<MaterialIcons name="keyboard-arrow-left" size={24} color={icon1} />
			<Text
				style={styles.buttonLabel}
				lightTextColor={icon1}
				darkTextColor={icon1}
			>
				戻る
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonLabel: {
		fontWeight: "400",
	},
	prev: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",

		width: 40,
		marginLeft: 20,
	},
});
