import type { VFC } from "react";
import React from "react";
import { Text } from "src/components/custom";
import { Layout } from "src/components/layout";
import { textStyles } from "src/styles";
import type { PaymentScreenProps } from "types";

export const PaymentDetailScreen: VFC<PaymentScreenProps<"PaymentDetail">> = (
	props
) => {
	const { id, amount, shopName } = props.route.params;
	return (
		<Layout>
			<Text style={textStyles.title}>{id}</Text>
			<Text style={textStyles.title}>{amount}</Text>
			<Text style={textStyles.title}>{shopName}</Text>
		</Layout>
	);
};
