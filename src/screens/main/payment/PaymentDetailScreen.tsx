import type { VFC } from "react";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Progress } from "src/components";
import { Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useGetSWRdev } from "src/hooks";
import type { PaymentScreenProps } from "types";
import type { Payment } from "types/fetcher";

export const PaymentDetailScreen: VFC<PaymentScreenProps<"PaymentDetail">> = (
  props
) => {
  const { id } = props.route.params;
  const { data, isError, isLoading } = useGetSWRdev<Payment>(`/payment/${id}`);

  const onPress = useCallback(() => {
    props.navigation.goBack();
  }, []);

  return (
    <Layout style={styles.full}>
      {isLoading ? (
        <Progress />
      ) : isError ? (
        <Text>エラーが発生しました</Text>
      ) : !data ? (
        <Text>データがありません</Text>
      ) : data ? (
        <>
          <View style={styles.box1}>
            <Text style={styles.shopName}>{data.Shop.shopName}</Text>
            <Text style={styles.price}>
              <Text style={styles.yensign}>¥</Text>
              {data.amount}
            </Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.key}>利用日</Text>
            <Text style={styles.value}>{data.updatedAt}</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.key}>支払い方法</Text>
            <Text style={styles.value}>一回払い</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.key}>利用者</Text>
            <Text style={styles.value}>本人</Text>
          </View>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.4}
            onPress={onPress}
          >
            <Text style={styles.btnLabel}>
              身に覚えがない場合は
              <Text style={styles.kochira}>こちら</Text>
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </Layout>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    justifyContent: "flex-start",
  },

  box1: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b333",
  },
  shopName: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  price: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "left",
  },
  yensign: {
    fontSize: 26,
    fontWeight: "300",
    textAlign: "left",
  },

  box2: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b333",
  },
  key: {
    width: "30%",
    fontSize: 15,
    textAlign: "left",
    fontWeight: "400",
  },
  value: {
    width: "70%",
    fontSize: 15,
    textAlign: "right",
    fontWeight: "400",
  },
  btn: {
    flexDirection: "row",
    alignItems: "flex-end",

    paddingTop: 15,
    width: "95%",
  },
  btnLabel: {
    fontSize: 15,
    textAlign: "right",
    fontWeight: "400",
  },
  kochira: {
    fontSize: 15,
  },
});
