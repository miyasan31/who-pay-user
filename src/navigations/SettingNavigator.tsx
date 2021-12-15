import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import {
	PasscodeScreen,
	SettingSelectScreen,
	VoiceRecordScreen,
} from "src/screens";
import type { SettingStackParamList } from "types";

const Setting = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	return (
		<Setting.Navigator
			initialRouteName="SettingSelect"
			screenOptions={{
				headerBackTitle: "戻る",
			}}
		>
			<Setting.Screen
				name="SettingSelect"
				component={SettingSelectScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Setting.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={() => ({
					title: "パスコード",
				})}
			/>
			<Setting.Screen
				name="VoiceRecord"
				component={VoiceRecordScreen}
				options={() => ({
					title: "録音",
				})}
			/>
		</Setting.Navigator>
	);
};
