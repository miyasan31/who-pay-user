import type { VFC } from "react";
import React from "react";
import { Progress } from "src/components";
import { Text } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useGetSWRdev } from "src/hooks";
import type { TabOneScreenProps } from "types";

type Amount = {
	value: number;
};

export const TabOneScreen: VFC<TabOneScreenProps<"TabOneScreen">> = () => {
	const { data, isError, isLoading } = useGetSWRdev<Amount>("/amount");

	return (
		<Layout>
			{isLoading ? (
				<Progress />
			) : isError ? (
				<Text>Error</Text>
			) : (
				<>
					<Text>今月の利用可能額は</Text>
					<Text>{data?.value}</Text>
				</>
			)}
		</Layout>
	);
};
