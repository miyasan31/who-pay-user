import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PrevButton } from "src/components";
import { useThemeColor } from "src/hooks";
import type { CreditScreenProps, CreditStackParamList } from "types";

import { CreditScreen } from "./CreditScreen";
import { CreditUpdateScreen } from "./CreditUpdateScreen";

type Option<T extends keyof CreditStackParamList> = CreditScreenProps<T>;

const Credit = createNativeStackNavigator<CreditStackParamList>();

export const CreditNavigator: VFC = () => {
  const backgroundColor = useThemeColor({}, "bg1");

  return (
    <Credit.Navigator
      initialRouteName="Credit"
      screenOptions={() => ({
        headerBackTitle: "一覧",
        headerStyle: { backgroundColor: backgroundColor },
        headerLargeTitle: true,
        headerLargeTitleStyle: {
          fontWeight: "400",
          fontSize: 30,
        },
      })}
    >
      <Credit.Screen
        name="Credit"
        component={CreditScreen}
        options={(options: Option<"Credit">) => ({
          title: "クレジットカード情報",
          headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
        })}
      />

      <Credit.Screen
        name="CreditUpdate"
        component={CreditUpdateScreen}
        options={(options: Option<"CreditUpdate">) => ({
          title: "クレジットカード更新",
          headerLeft: () => <PrevButton {...options} screen="Credit" />,
        })}
      />
    </Credit.Navigator>
  );
};
