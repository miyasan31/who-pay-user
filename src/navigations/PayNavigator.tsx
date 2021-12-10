import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { CalculatorScreen, PasscodeScreen, VoiceRecord } from "src/screens";
import type { PayStackParamList } from "types";

const PayStack = createNativeStackNavigator<PayStackParamList>();

export const PayNavigator: VFC = () => {
	return (
		<PayStack.Navigator
			initialRouteName="Calculator"
			screenOptions={{
				title: "Who Pay",
				headerBackTitle: "戻る",
			}}
		>
			<PayStack.Screen
				name="Calculator"
				component={CalculatorScreen}
				options={() => ({})}
			/>
			<PayStack.Screen
				name="VoiceRecord"
				component={VoiceRecord}
				options={() => ({})}
			/>
			<PayStack.Screen
				name="Passcode"
				component={PasscodeScreen}
				options={() => ({})}
			/>
		</PayStack.Navigator>
	);
};
