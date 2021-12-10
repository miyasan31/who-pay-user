import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import {
	ShopInfoRegisterScreen,
	ShopInfoVerificationScreen,
	SigninScreen,
	SignupScreen,
	VerifyScreen,
} from "src/screens";
import type { AuthStackParamList } from "types";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: VFC = () => {
	return (
		<AuthStack.Navigator
			initialRouteName="Signin"
			screenOptions={{ headerShown: false }}
		>
			<AuthStack.Screen
				name="Signin"
				component={SigninScreen}
				options={() => ({})}
			/>
			<AuthStack.Screen
				name="Signup"
				component={SignupScreen}
				options={() => ({})}
			/>
			<AuthStack.Screen
				name="Verify"
				component={VerifyScreen}
				options={() => ({})}
			/>
			<AuthStack.Screen
				name="ShopInfoRegister"
				component={ShopInfoRegisterScreen}
				options={() => ({})}
			/>
			<AuthStack.Screen
				name="ShopInfoVerification"
				component={ShopInfoVerificationScreen}
				options={() => ({})}
			/>
		</AuthStack.Navigator>
	);
};
