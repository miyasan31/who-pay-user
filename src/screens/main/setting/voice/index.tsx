import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { VFC } from "react";
import React from "react";
import { PrevButton } from "src/components";
import { useThemeColor } from "src/hooks";
import type { VoiceRecordScreenProps, VoiceRecordStackParamList } from "types";

import { VoiceRecordScreen } from "./VoiceRecordScreen";
import { VoiceRecordSettingSelectScreen } from "./VoiceRecordSettingSelectScreen";
import { VoiceRecordUpdateScreen } from "./VoiceRecordUpdateScreen";

type Option<T extends keyof VoiceRecordStackParamList> =
	VoiceRecordScreenProps<T>;

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
				options={(options: Option<"VoiceRecordSettingSelect">) => ({
					title: "声紋認証",
					headerLeft: () => <PrevButton {...options} screen="SettingSelect" />,
				})}
			/>

			<VoiceRecord.Screen
				name="VoiceRecord"
				component={VoiceRecordScreen}
				options={(options: Option<"VoiceRecord">) => ({
					title: "声紋認証登録",
					headerLeft: () => (
						<PrevButton {...options} screen="VoiceRecordSettingSelect" />
					),
				})}
			/>

			<VoiceRecord.Screen
				name="VoiceRecordUpdate"
				component={VoiceRecordUpdateScreen}
				options={(options: Option<"VoiceRecordUpdate">) => ({
					title: "声紋認証更新",
					headerLeft: () => (
						<PrevButton {...options} screen="VoiceRecordSettingSelect" />
					),
				})}
			/>
		</VoiceRecord.Navigator>
	);
};
