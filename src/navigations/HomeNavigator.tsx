import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { useRecoilValue } from "recoil";
import { user } from "src/atom";
import { useThemeColor } from "src/hooks";
import { HomeScreen } from "src/screens";
import type { TopStackParamList } from "types";

const Top = createNativeStackNavigator<TopStackParamList>();

export const HomeNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	const userInfo = useRecoilValue(user);
	return (
		<Top.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: { backgroundColor: backgroundColor },
			}}
		>
			<Top.Screen
				name="Home"
				component={HomeScreen}
				options={() => ({
					title: `${userInfo.firstName} ${userInfo.lastName}さん`,
					headerLargeTitle: true,
					headerLargeTitleStyle: {
						fontWeight: "400",
						fontSize: 30,
					},
				})}
			/>
		</Top.Navigator>
	);
};
