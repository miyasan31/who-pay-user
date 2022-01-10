import { format } from "date-fns";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { Progress } from "src/components";
import { Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useGetSWR } from "src/hooks";
import { textStyles } from "src/styles";
import type { PaymentScreenProps } from "types";
import type { PaymentDetail } from "types/fetcher";

export const PaymentDetailScreen: VFC<PaymentScreenProps<"PaymentDetail">> = (
  props
) => {
  const { id } = props.route.params;
  const { data, isError, isLoading } = useGetSWR<PaymentDetail>(
    `/payment/${id}`,
    {
      enabled: !!id,
    }
  );

  const resultDate = (date: Date) => format(new Date(date), "yyyy年M月d日");

  return (
    <Layout style={styles.full}>
      {isLoading ? (
        <Progress />
      ) : isError ? (
        <Text style={textStyles.fetchResult}>エラーが発生しました</Text>
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
            <Text style={styles.value}>{resultDate(data.updatedAt)}</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.key}>支払い方法</Text>
            <Text style={styles.value}>一回払い</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.key}>利用者</Text>
            <Text style={styles.value}>本人</Text>
          </View>
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
