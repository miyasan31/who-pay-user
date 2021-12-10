import type { VFC } from "react";
import React, { useCallback } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useSetRecoilState } from "recoil";
import { shop } from "src/atom";
import { ColorButton, Text, View } from "src/components/custom";
import { onKeyBoardClose } from "src/functions";
import { requestFetcher } from "src/functions/fetcher";
import { deleteSequreStore, getSequreStore } from "src/functions/store";
import { useThemeColor } from "src/hooks";
import { buttonStyles } from "src/styles";
import type { BottomTabScreenProps } from "types";

export const HomeScreen: VFC<BottomTabScreenProps<"Home">> = () => {
	const accent = useThemeColor({}, "accent");
	const setShopInfo = useSetRecoilState(shop);

	const onSignout = useCallback(async () => {
		const tokenResult = await getSequreStore("access_token");
		const status = await requestFetcher(
			"/auth/signout",
			{ token: tokenResult },
			"POST"
		);
		if (status >= 400) {
			console.info("不正なリクエスト");
			return;
		}
		await deleteSequreStore("access_token");
		setShopInfo({
			id: "",
			shopName: "",
			email: "",
			phone: "",
			token: "",
			isSignin: false,
		});
	}, []);

	return (
		<TouchableWithoutFeedback onPress={onKeyBoardClose}>
			<View style={styles.container}>
				<Text style={styles.title}>サインインなう</Text>
				<Text style={styles.title}>HomScreen</Text>

				<View
					style={styles.separator}
					lightBgColor="#eee"
					darkBgColor="rgba(255,255,255,0.1)"
				/>

				<ColorButton
					title="サインアウト"
					lightBgColor={accent}
					darkBgColor={accent}
					outlineStyle={[buttonStyles.outline, buttonStyles.semi]}
					onPress={onSignout}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		paddingVertical: 10,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	inputWrap: {
		minWidth: "80%",
		padding: 10,
		borderRadius: 10,
	},
	buttonLabel: {
		fontSize: 20,
	},
	button: {
		// boxShadow
		shadowColor: "#656565a2",
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 5,
		shadowOpacity: 0.6,
	},
});
