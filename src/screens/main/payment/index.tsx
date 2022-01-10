import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PrevButton } from "src/components";
import { useMonthPagenation, useThemeColor } from "src/hooks";
import type { PaymentScreenProps, PaymentStackParamList } from "types";

import { PaymentDetailScreen } from "./PaymentDetailScreen";
import { PaymentListScreen } from "./PaymentListScreen";

type Option<T extends keyof PaymentStackParamList> = PaymentScreenProps<T>;

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
        options={(options: Option<"PaymentDetail">) => ({
          title: "詳細",
          headerLeft: () => <PrevButton {...options} screen="PaymentList" />,
        })}
      />
    </Payment.Navigator>
  );
};
