import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { TabBarIcon } from "src/components/icon";
import { useColorScheme } from "src/hooks";
import { PaymentNavigator } from "src/navigations/PaymentNavigator";
import { SettingNavigator } from "src/navigations/SettingNavigator";
import { HomeScreen } from "src/screens";
import { theme } from "src/styles";
import type { BottomTabParamList } from "types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: VFC = () => {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: theme[colorScheme].primary,
				tabBarStyle: { position: "absolute" },
				headerShown: false,
				tabBarBackground: () => (
					<BlurView intensity={10} style={StyleSheet.absoluteFill} />
				),
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "ホーム",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home-outline" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Payment"
				component={PaymentNavigator}
				options={{
					title: "決済履歴",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list-outline" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Setting"
				component={SettingNavigator}
				options={{
					title: "設定",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="settings-outline" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};
