// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useThemeColor } from "src/hooks";
import type { RootStackParamList } from "types";

import { BottomTabNavigator } from "./BottomTabNavigator";

// const Drawer = createDrawerNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<RootStack.Navigator initialRouteName="Root">
			<RootStack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{
					headerShown: false,
					headerStyle: { backgroundColor: backgroundColor },
				}}
			/>
		</RootStack.Navigator>
	);
};
