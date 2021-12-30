import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { useThemeColor } from "src/hooks";
import { TabTwoScreen } from "src/screens/tab2";
import type { TabTwoStackParamList } from "types";

const TabTwo = createNativeStackNavigator<TabTwoStackParamList>();

export const TabTwoNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");

	return (
		<TabTwo.Navigator
			initialRouteName="TabTwoScreen"
			screenOptions={{
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			}}
		>
			<TabTwo.Screen
				name="TabTwoScreen"
				component={TabTwoScreen}
				options={() => ({})}
			/>
		</TabTwo.Navigator>
	);
};
