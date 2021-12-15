import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PaymentDetailScreen, PaymentListScreen } from "src/screens";
import type { PaymentStackParamList } from "types";

const Payment = createNativeStackNavigator<PaymentStackParamList>();

export const PaymentNavigator: VFC = () => {
	return (
		<Payment.Navigator
			initialRouteName="PaymentList"
			screenOptions={{
				headerBackTitle: "戻る",
			}}
		>
			<Payment.Screen
				name="PaymentList"
				component={PaymentListScreen}
				options={() => ({
					headerShown: false,
				})}
			/>
			<Payment.Screen
				name="PaymentDetail"
				component={PaymentDetailScreen}
				options={() => ({
					title: "詳細",
				})}
			/>
		</Payment.Navigator>
	);
};
