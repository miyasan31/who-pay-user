import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import type { PasscodeScreenProps, PasscodeStackParamList } from "types";

import { PasscodeScreen } from "./PasscodeScreen";
import { PasscodeSettingSelectScreen } from "./PasscodeSettingSelectScreen";
import { PasscodeUpdateScreen } from "./PasscodeUpdateScreen";

type Option = PasscodeScreenProps<
	"PasscodeSettingSelect" | "Passcode" | "PasscodeUpdate"
>;
type PrevProps = Option & {
	screen: "PasscodeSettingSelect" | "SettingSelect";
};

const Passcode = createNativeStackNavigator<PasscodeStackParamList>();

export const PasscodeNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<Passcode.Navigator
			initialRouteName="PasscodeSettingSelect"
			screenOptions={{
				headerBackTitle: "一覧",
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			}}
		>
			<Passcode.Screen
				name="PasscodeSettingSelect"
				component={PasscodeSettingSelectScreen}
				options={(options: Option) => ({
					title: "パスコード",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<Passcode.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={(options: Option) => ({
					title: "パスコード登録",
					headerLeft: () => (
						<PrevButton {...options} screen="PasscodeSettingSelect" />
					),
				})}
			/>

			<Passcode.Screen
				name="PasscodeUpdate"
				component={PasscodeUpdateScreen}
				options={(options: Option) => ({
					title: "パスコード更新",
					headerLeft: () => (
						<PrevButton {...options} screen="PasscodeSettingSelect" />
					),
				})}
			/>
		</Passcode.Navigator>
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
