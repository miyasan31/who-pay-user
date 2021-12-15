import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { useThemeColor } from "src/hooks";
import { AccountNavigator } from "src/navigations/AccountNavigator";
import { CreditNavigator } from "src/navigations/CreditNavigator";
import { PasscodeNavigator } from "src/navigations/PasscodeNavigator";
import { VoiceRecordNavigator } from "src/navigations/VoiceRecordNavigator";
import { SettingSelectScreen } from "src/screens";
import type { SettingStackParamList } from "types";

const Setting = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<Setting.Navigator
			initialRouteName="SettingSelect"
			screenOptions={{
				headerStyle: { backgroundColor: backgroundColor },
			}}
		>
			<Setting.Screen
				name="SettingSelect"
				component={SettingSelectScreen}
				options={() => ({
					title: "設定",
					headerLargeTitle: true,
					headerLargeTitleStyle: {
						fontWeight: "400",
						fontSize: 30,
					},
				})}
			/>

			<Setting.Screen
				name="AccountSetting"
				component={AccountNavigator}
				options={() => ({
					title: "アカウント",
					headerShown: false,
				})}
			/>

			<Setting.Screen
				name="CreditSetting"
				component={CreditNavigator}
				options={() => ({
					title: "クレジットカード",
					headerShown: false,
				})}
			/>

			<Setting.Screen
				name="PasscodeSetting"
				component={PasscodeNavigator}
				options={() => ({
					title: "パスコード",
					headerShown: false,
				})}
			/>

			<Setting.Screen
				name="VoiceRecordSetting"
				component={VoiceRecordNavigator}
				options={() => ({
					title: "声紋認証",
					headerShown: false,
				})}
			/>
		</Setting.Navigator>
	);
};
