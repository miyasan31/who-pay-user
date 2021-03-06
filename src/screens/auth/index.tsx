import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import type { AuthStackParamList } from "types";

import { SigninActionScreen } from "./SigninActionScreen";
import { SigninScreen } from "./SigninScreen";
import { SignupScreen } from "./SignupScreen";
import { UserInfoRegisterScreen } from "./UserInfoRegisterScreen";
import { VerifyScreen } from "./VerifyScreen";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: VFC = () => {
  return (
    <AuthStack.Navigator initialRouteName="SigninAction" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SigninAction" component={SigninActionScreen} />
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Verify" component={VerifyScreen} />
      <AuthStack.Screen name="UserInfoRegister" component={UserInfoRegisterScreen} />
    </AuthStack.Navigator>
  );
};
