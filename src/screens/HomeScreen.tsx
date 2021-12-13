import type { VFC } from "react";
import React from "react";
import { Text, View } from "src/components/custom";
import { textStyles, viewStyles } from "src/styles";
import type { BottomTabScreenProps } from "types";

export const HomeScreen: VFC<BottomTabScreenProps<"Home">> = () => {
	return (
		<View style={viewStyles.full}>
			<Text style={textStyles.title}>今月の利用可能額は</Text>
		</View>
	);
};
