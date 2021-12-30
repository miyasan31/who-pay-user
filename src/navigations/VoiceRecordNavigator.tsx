import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import {
	VoiceRecordScreen,
	VoiceRecordSettingSelectScreen,
	VoiceRecordUpdateScreen,
} from "src/screens";
import type { VoiceRecordScreenProps, VoiceRecordStackParamList } from "types";

type Option = VoiceRecordScreenProps<
	"VoiceRecordSettingSelect" | "VoiceRecord" | "VoiceRecordUpdate"
>;
type PrevProps = Option & {
	screen: "VoiceRecordSettingSelect" | "SettingSelect";
};

const VoiceRecord = createNativeStackNavigator<VoiceRecordStackParamList>();

export const VoiceRecordNavigator: VFC = () => {
	const backgroundColor = useThemeColor({}, "bg1");
	return (
		<VoiceRecord.Navigator
			initialRouteName="VoiceRecordSettingSelect"
			screenOptions={{
				headerBackTitle: "一覧",
				headerStyle: { backgroundColor: backgroundColor },
				headerLargeTitle: true,
				headerLargeTitleStyle: {
					fontWeight: "400",
					fontSize: 30,
				},
			}}
		>
			<VoiceRecord.Screen
				name="VoiceRecordSettingSelect"
				component={VoiceRecordSettingSelectScreen}
				options={(options: Option) => ({
					title: "声紋認証",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<VoiceRecord.Screen
				name="VoiceRecord"
				component={VoiceRecordScreen}
				options={(options: Option) => ({
					title: "声紋認証登録",
					headerLeft: () => (
						<PrevButton {...options} screen="VoiceRecordSettingSelect" />
					),
				})}
			/>

			<VoiceRecord.Screen
				name="VoiceRecordUpdate"
				component={VoiceRecordUpdateScreen}
				options={(options: Option) => ({
					title: "声紋認証更新",
					headerLeft: () => (
						<PrevButton {...options} screen="VoiceRecordSettingSelect" />
					),
				})}
			/>
		</VoiceRecord.Navigator>
	);
};

const PrevButton: VFC<PrevProps> = (props) => {
	const icon1 = useThemeColor({}, "icon1");

	const onPrevScreen = useCallback((navigation) => {
		navigation.navigate(props.screen);
	}, []);

	return (
		<Pressable
			onPress={() => onPrevScreen(props.navigation)}
			style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.prev]}
		>
			<MaterialIcons name="keyboard-arrow-left" size={24} color={icon1} />
			<Text
				style={styles.buttonLabel}
				lightTextColor={icon1}
				darkTextColor={icon1}
			>
				戻る
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonLabel: {
		fontWeight: "400",
	},
	prev: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",

		width: 40,
		marginLeft: 20,
	},
});
