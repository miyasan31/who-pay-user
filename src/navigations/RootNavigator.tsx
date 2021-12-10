// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PayNavigator } from "src/navigations/PayNavigator";
import type { RootStackParamList } from "types";

// const Drawer = createDrawerNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	return (
		<RootStack.Navigator initialRouteName="Pay">
			<RootStack.Screen
				name="Pay"
				component={PayNavigator}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	);
};
