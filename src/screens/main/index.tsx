import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { TabBarIcon } from "src/components/icon";
import { useColorScheme } from "src/hooks";
import { useThemeColor } from "src/hooks/useThemeColor";
import { HomeNavigator } from "src/screens/main/home";
import { PaymentNavigator } from "src/screens/main/payment";
import { SettingNavigator } from "src/screens/main/setting";
import { theme } from "src/styles";
import type { MainBottomTabParamList } from "types";

const MainBottomTab = createBottomTabNavigator<MainBottomTabParamList>();

export const MainBottomTabNavigator: VFC = () => {
	const colorScheme = useColorScheme();
	const bg1 = useThemeColor({}, "bg1");

	return (
		<MainBottomTab.Navigator
			initialRouteName="Top"
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme[colorScheme].primary,
				tabBarStyle: { position: "absolute", backgroundColor: bg1 },
				tabBarBackground: () => (
					<BlurView intensity={10} style={StyleSheet.absoluteFill} />
				),
			}}
		>
			<MainBottomTab.Screen
				name="Top"
				component={HomeNavigator}
				options={{
					tabBarLabel: "ホーム",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="home-outline" color={color} />
					),
				}}
			/>
			<MainBottomTab.Screen
				name="Payment"
				component={PaymentNavigator}
				options={() => ({
					title: "決済履歴",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="list-outline" color={color} />
					),
				})}
			/>

			<MainBottomTab.Screen
				name="Setting"
				component={SettingNavigator}
				options={() => ({
					title: "設定",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="settings-outline" color={color} />
					),
				})}
			/>
		</MainBottomTab.Navigator>
	);
};
