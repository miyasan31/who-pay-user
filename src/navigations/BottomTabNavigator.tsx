import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import type { ComponentProps, VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useColorScheme } from "src/hooks";
import { PaymentNavigator } from "src/navigations/PaymentNavigator";
import { SettingNavigator } from "src/navigations/SettingNavigator";
import { HomeScreen } from "src/screens";
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
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: theme[colorScheme].primary,
				tabBarStyle: { position: "absolute" },
				tabBarBackground: () => (
					<BlurView intensity={10} style={StyleSheet.absoluteFill} />
				),
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					// tabBarBadge: 20, // バッチの文字
					// tabBarBadgeStyle: {
					// 	color: themes[colorScheme].background, // バッチの文字色
					// 	backgroundColor: themes[colorScheme].tint, // バッチの背景色
					// },
					// tabBarShowLabel: false, // タブのタイトルをつけるか
					title: "ホームタブ",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerStyle: {
						backgroundColor: theme[colorScheme].bg0,
					},
					// ヘッダーの左側にアイコンとか設定できる
				}}
			/>

			<BottomTab.Screen
				name="Payment"
				component={PaymentNavigator}
				options={({ navigation }: BottomTabScreenProps<"Payment">) => ({
					title: "決済履歴タブ",
					headerShown: false,

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
							<FontAwesome
								name="info-circle"
								size={25}
								color={theme[colorScheme].icon1}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
					headerStyle: {
						backgroundColor: theme[colorScheme].bg0,
					},
				})}
			/>

			<BottomTab.Screen
				name="Setting"
				component={SettingNavigator}
				options={({ navigation }: BottomTabScreenProps<"Setting">) => ({
					title: "設定タブ",
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
							<AntDesign
								name="pluscircle"
								size={25}
								color={theme[colorScheme].icon1}
								style={{ marginLeft: 15 }}
							/>
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

const TabBarIcon = (props: {
	name: ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) => {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};
