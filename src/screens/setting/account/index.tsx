import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import type { AccountScreenProps, AccountStackParamList } from "types";

import { AccountScreen } from "./AccountScreen";
import { AccountUpdateScreen } from "./AccountUpdateScreen";

type Option = AccountScreenProps<"Account" | "AccountUpdate">;
type PrevProps = Option & {
	screen: "Account" | "SettingSelect";
};

const Account = createNativeStackNavigator<AccountStackParamList>();

export const AccountNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<Account.Navigator
			initialRouteName="Account"
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
			<Account.Screen
				name="Account"
				component={AccountScreen}
				options={(options: Option) => ({
					title: "アカウント情報",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<Account.Screen
				name="AccountUpdate"
				component={AccountUpdateScreen}
				options={(options: Option) => ({
					title: "アカウント更新",
					headerLeft: () => <PrevButton {...options} screen="Account" />,
				})}
			/>
		</Account.Navigator>
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
