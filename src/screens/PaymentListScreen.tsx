import type { VFC } from "react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Progress } from "src/components";
import { SafeAreaView, Text } from "src/components/custom";
import { ListView } from "src/components/ListView";
import { useGetSWRdev } from "src/hooks";
import type { PaymentScreenProps } from "types";
import type { Payment } from "types/fetcher";

export const PaymentListScreen: VFC<PaymentScreenProps<"PaymentList">> = (
	props
) => {
	const { data, isError, isLoading } = useGetSWRdev<Payment[]>("/payment");

	const renderItem = ({ item }: { item: Payment }) => {
		const onNavigation = () => {
			props.navigation.navigate("PaymentDetail", {
				id: item.id,
				amount: item.amount,
				shopName: item.Shop.shopName,
			});
		};
		return (
			<ListView onPress={onNavigation}>
				<Text style={styles.title}>{item.amount}</Text>
				<Text style={styles.title}>{item.Shop.shopName}</Text>
			</ListView>
		);
	};

	return (
		<SafeAreaView>
			{isLoading ? (
				<Progress />
			) : isError ? (
				<Text>エラーが発生しました</Text>
			) : !data ? (
				<Text>データがありません</Text>
			) : data ? (
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item, _) => String(item.id)}
				/>
			) : null}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		fontWeight: "normal",
		textAlign: "left",
		color: "#010101",
	},
});
