import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import type { ComponentProps, VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "src/hooks";
import { TabOneScreen, TabThreeScreen, TabTwoScreen } from "src/screens";
import { theme } from "src/styles";
import type { BottomTabParamList, BottomTabScreenProps } from "types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: VFC = () => {
	const colorScheme = useColorScheme();

	const onScreenPush = useCallback((navigation, screen) => {
		// navigation.replace で右から画面が出てくる
		// navigation.replace(screen);
		// navigation.navigate で下からモーダルが開く
		navigation.navigate(screen);
	}, []);

	return (
		<BottomTab.Navigator
			// 最初の画面を指定
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: theme[colorScheme].primary,
				tabBarStyle: { position: "absolute" },
				tabBarBackground: () => <BlurView intensity={10} style={StyleSheet.absoluteFill} />,
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={TabOneScreen}
				options={{
					// tabBarBadge: 20, // バッチの文字
					// tabBarBadgeStyle: {
					// 	color: themes[colorScheme].background, // バッチの文字色
					// 	backgroundColor: themes[colorScheme].tint, // バッチの背景色
					// },
					// tabBarShowLabel: false, // タブのタイトルをつけるか
					title: "Tab One",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerStyle: {
						backgroundColor: theme[colorScheme].bg0,
					},
					// ヘッダーの左側にアイコンとか設定できる
				}}
			/>

			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={({ navigation }: BottomTabScreenProps<"TabTwo">) => ({
					title: "Tab Two",

					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					// ヘッダーの右側にアクション用のボタンとか設定できる
					headerRight: () => (
						<Pressable
							// クリックしたらモーダルが開く
							onPress={() => onScreenPush(navigation, "Signin")}
							// 押している時にスタイルを変更できる
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome name="info-circle" size={25} color={theme[colorScheme].icon1} style={{ marginRight: 15 }} />
						</Pressable>
					),
					headerStyle: {
						backgroundColor: theme[colorScheme].bg0,
					},
				})}
			/>

			<BottomTab.Screen
				name="TabThree"
				component={TabThreeScreen}
				options={({ navigation }: BottomTabScreenProps<"TabThree">) => ({
					title: "Tab Three",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerLeft: () => (
						<Pressable
							// クリックしたらモーダルが開く
							onPress={() => onScreenPush(navigation, "Modal2")}
							// 押している時にスタイルを変更できる
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<AntDesign name="pluscircle" size={25} color={theme[colorScheme].icon1} style={{ marginLeft: 15 }} />
						</Pressable>
					),
					headerStyle: {
						backgroundColor: theme[colorScheme].bg0,
					},
				})}
			/>
		</BottomTab.Navigator>
	);
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const TabBarIcon = (props: { name: ComponentProps<typeof FontAwesome>["name"]; color: string }) => {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};
