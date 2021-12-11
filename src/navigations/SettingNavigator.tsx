import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PasscodeScreen, SettingScreen } from "src/screens";
import type { SettingStackParamList } from "types";

const Setting = createNativeStackNavigator<SettingStackParamList>();

export const SettingNavigator: VFC = () => {
	return (
		<Setting.Navigator
			initialRouteName="Setting"
			screenOptions={{
				title: "Who Pay",
				headerBackTitle: "戻る",
				headerShown: false,
			}}
		>
			<Setting.Screen
				name="Setting"
				component={SettingScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Setting.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
		</Setting.Navigator>
	);
};
