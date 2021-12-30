import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { useThemeColor } from "src/hooks";
import { TabOneScreen } from "src/screens/tab1";
import type { TabOneStackParamList } from "types";

const TabOne = createNativeStackNavigator<TabOneStackParamList>();

export const TabOneNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");

	return (
		<TabOne.Navigator
			initialRouteName="TabOneScreen"
			screenOptions={{
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			}}
		>
			<TabOne.Screen
				name="TabOneScreen"
				component={TabOneScreen}
				options={() => ({})}
			/>
		</TabOne.Navigator>
	);
};
