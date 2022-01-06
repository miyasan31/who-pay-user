import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PrevButton } from "src/components";
import { useThemeColor } from "src/hooks";
import type { AccountScreenProps, AccountStackParamList } from "types";

import { AccountScreen } from "./AccountScreen";
import { AccountUpdateScreen } from "./AccountUpdateScreen";

type Option<T extends keyof AccountStackParamList> = AccountScreenProps<T>;

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
				options={(options: Option<"Account">) => ({
					title: "アカウント情報",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<Account.Screen
				name="AccountUpdate"
				component={AccountUpdateScreen}
				options={(options: Option<"AccountUpdate">) => ({
					title: "アカウント更新",
					headerLeft: () => <PrevButton {...options} screen="Account" />,
				})}
			/>
		</Account.Navigator>
	);
};
