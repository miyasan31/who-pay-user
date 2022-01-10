import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PrevButton } from "src/components";
import { useThemeColor } from "src/hooks";
import type { PasscodeScreenProps, PasscodeStackParamList } from "types";

import { PasscodeScreen } from "./PasscodeScreen";
import { PasscodeSettingSelectScreen } from "./PasscodeSettingSelectScreen";
import { PasscodeUpdateScreen } from "./PasscodeUpdateScreen";

type Option<T extends keyof PasscodeStackParamList> = PasscodeScreenProps<T>;

const Passcode = createNativeStackNavigator<PasscodeStackParamList>();

export const PasscodeNavigator: VFC = () => {
  const backgroundColor = useThemeColor({}, "bg1");

  return (
    <Passcode.Navigator
      initialRouteName="PasscodeSettingSelect"
      screenOptions={{
        headerBackTitle: "一覧",
        headerStyle: { backgroundColor: backgroundColor },
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          fontWeight: "400",
          fontSize: 30,
        },
      }}
    >
      <Passcode.Screen
        name="PasscodeSettingSelect"
        component={PasscodeSettingSelectScreen}
        options={(options: Option<"PasscodeSettingSelect">) => ({
          title: "パスコード",
          headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
        })}
      />

      <Passcode.Screen
        name="Passcode"
        component={PasscodeScreen}
        options={(options: Option<"Passcode">) => ({
          title: "パスコード登録",
          headerLeft: () => (
            <PrevButton {...options} screen="PasscodeSettingSelect" />
          ),
        })}
      />

      <Passcode.Screen
        name="PasscodeUpdate"
        component={PasscodeUpdateScreen}
        options={(options: Option<"PasscodeUpdate">) => ({
          title: "パスコード更新",
          headerLeft: () => (
            <PrevButton {...options} screen="PasscodeSettingSelect" />
          ),
        })}
      />
    </Passcode.Navigator>
  );
};
