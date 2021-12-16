import { MaterialIcons } from "@expo/vector-icons";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { user } from "src/atom";
import { ListItem } from "src/components";
import { Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor } from "src/hooks";
import type { AccountScreenProps } from "types";

export const AccountScreen: VFC<AccountScreenProps<"Account">> = (props) => {
	const icon1 = useThemeColor({}, "icon1");
	const userInfo = useRecoilValue(user);

	// List["screen"] ルックアップタイプ
	const onNavigation = () => {
		props.navigation.navigate("AccountUpdate");
	};

	return (
		<Layout style={styles.full}>
			<ListItem style={styles.list} onPress={onNavigation}>
				<View style={styles.listbox}>
					<Text style={styles.key}>
						{userInfo.firstName}
						{userInfo.lastName}
					</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
				</View>
			</ListItem>

			<ListItem style={styles.list} onPress={onNavigation}>
				<View style={styles.listbox}>
					<Text style={styles.key}>{userInfo.phone}</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
				</View>
			</ListItem>

			<ListItem style={styles.list} onPress={onNavigation}>
				<View style={styles.listbox}>
					<Text style={styles.key}>{userInfo.email}</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
				</View>
			</ListItem>

			<ListItem style={styles.list} onPress={onNavigation}>
				<View style={styles.listbox}>
					{/* <Text style={styles.key}></Text> */}
					{/* <MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} /> */}
				</View>
			</ListItem>

			<ListItem style={styles.list} onPress={onNavigation}>
				<View style={styles.listbox}>
					<Text style={styles.key}>クレジットカード</Text>
					<MaterialIcons name="keyboard-arrow-right" size={24} color={icon1} />
				</View>
			</ListItem>
		</Layout>
	);
};

const styles = StyleSheet.create({
	full: {
		flex: 1,
		justifyContent: "flex-start",
	},
	list: {
		width: "100%",
	},
	listbox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "95%",
		padding: 10,
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: "#b3b3b333",
	},
	key: {
		width: "90%",
		fontSize: 18,
		textAlign: "left",
		fontWeight: "400",
	},
	borderNone: {
		borderBottomWidth: 0,
	},
});
