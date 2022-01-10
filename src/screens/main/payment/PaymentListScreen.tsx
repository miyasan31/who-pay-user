import { format } from "date-fns";
import type { VFC } from "react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { date, user } from "src/atoms";
import { ListItem, Progress } from "src/components";
import { Text, View } from "src/components/custom";
import { SafeAreaLayout } from "src/components/layout";
import { useGetSWR, useThemeColor } from "src/hooks";
import { textStyles } from "src/styles";
import type { PaymentScreenProps } from "types";
import type { Payment } from "types/fetcher";

export const PaymentListScreen: VFC<PaymentScreenProps<"PaymentList">> = (
  props
) => {
  const color = useThemeColor({}, "text2");
  const userInfo = useRecoilValue(user);
  const dateInfo = useRecoilValue(date);

  const { data, isError, isLoading } = useGetSWR<Payment[]>(
    `/payment/user/${userInfo.id}/${dateInfo.year}/${dateInfo.month}`,
    {
      enabled: !!userInfo.id && !!dateInfo.year && !!dateInfo.month,
    }
  );

  return (
    <SafeAreaLayout>
      {isLoading ? (
        <Progress />
      ) : isError ? (
        <Text style={textStyles.fetchResult}>エラーが発生しました</Text>
      ) : data?.length === 0 ? (
        <Text style={textStyles.fetchResult}>データがありません</Text>
      ) : data ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, _) => String(item.id)}
        />
      ) : null}
    </SafeAreaLayout>
  );

  // eslint-disable-next-line func-style
  function renderItem({ item }: { item: Payment }) {
    const date = format(new Date(item.updatedAt), "yyyy年M月d日");

    const onNavigation = () => {
      props.navigation.navigate("PaymentDetail", {
        id: item.id,
      });
    };

    return (
      <ListItem style={styles.list} onPress={onNavigation}>
        <View style={styles.leftLayout}>
          <Text style={styles.shopName}>{item.Shop.shopName}</Text>
          <Text
            style={styles.date}
            lightTextColor={color}
            darkTextColor={color}
          >
            {date}
          </Text>
        </View>
        <View style={styles.rightLayout}>
          <Text
            style={styles.frequency}
            lightTextColor={color}
            darkTextColor={color}
          >
            1回払い
          </Text>
          <Text style={styles.price}>
            <Text style={styles.yensign}>¥</Text>
            {item.amount}
          </Text>
        </View>
      </ListItem>
    );
  }
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 15,
    marginHorizontal: "1%",

    borderBottomWidth: 1,
    borderBottomColor: "#88888833",
  },

  leftLayout: {},
  rightLayout: {
    justifyContent: "flex-end",
  },

  shopName: {
    paddingBottom: 10,

    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
  },
  date: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "left",
  },
  frequency: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "normal",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
  },
  yensign: {
    fontSize: 24,
    fontWeight: "300",
  },
});
