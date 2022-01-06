import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useMonthPagenation, useThemeColor } from "src/hooks";
import type { PaymentScreenProps, PaymentStackParamList } from "types";

import { PaymentDetailScreen } from "./PaymentDetailScreen";
import { PaymentListScreen } from "./PaymentListScreen";

type Option = PaymentScreenProps<"PaymentList" | "PaymentDetail">;
type PrevProps = Option & {
	screen: "PaymentList";
};

const Payment = createNativeStackNavigator<PaymentStackParamList>();

export const PaymentNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");

	const { dateInfo, isThisMonth, PrevMounth, NextMounth } =
		useMonthPagenation();

	return (
		<Payment.Navigator
			initialRouteName="PaymentList"
			screenOptions={{
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			}}
		>
			<Payment.Screen
				name="PaymentList"
				component={PaymentListScreen}
				options={() => ({
					title: `${dateInfo.year}年${dateInfo.month}月`,
					headerLeft: () => <PrevMounth />,
					headerRight: () => (isThisMonth ? <NextMounth /> : null),
				})}
			/>

			<Payment.Screen
				name="PaymentDetail"
				component={PaymentDetailScreen}
				options={(options: Option) => ({
					title: "詳細",
					headerLeft: () => <PrevButton {...options} screen="PaymentList" />,
				})}
			/>
		</Payment.Navigator>
	);
};

const PrevButton: VFC<PrevProps> = (props) => {
	const icon1 = useThemeColor({}, "icon1");

	const onPrevScreen = useCallback((navigation) => {
		navigation.navigate(props.screen);
	}, []);

	return (
		<Pressable
			onPress={() => onPrevScreen(props.navigation)}
			style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
		>
			<MaterialIcons name="keyboard-arrow-left" size={24} color={icon1} />
			<Text
				style={styles.buttonLabel}
				lightTextColor={icon1}
				darkTextColor={icon1}
			>
				戻る
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonLabel: {
		fontWeight: "400",
	},
	prev: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",

		width: 40,
		marginLeft: 20,
	},
});
