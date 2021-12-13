import type { VFC } from "react";
import React, { useCallback } from "react";
import { ColorButton, Text, View } from "src/components/custom";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { PaymentScreenProps } from "types";

export const PaymentListScreen: VFC<PaymentScreenProps<"PaymentList">> = (
	props
) => {
	const onNavigation = useCallback(() => {
		props.navigation.navigate("PaymentDetail");
	}, []);

	return (
		<View style={viewStyles.full}>
			<Text style={textStyles.title}>PaymentListScreen</Text>

			<ColorButton
				title="詳細ページへ"
				outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
				onPress={onNavigation}
			/>
		</View>
	);
};
