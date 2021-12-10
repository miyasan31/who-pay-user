import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import type { VFC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ColorButton, Text, View } from "src/components/custom";
import { useThemeColor } from "src/hooks";
import { buttonStyles, textStyles, viewStyles } from "src/styles";
import type { PayScreenProps } from "types";

let recording = new Audio.Recording();

export const VoiceRecord: VFC<PayScreenProps<"VoiceRecord">> = (props) => {
	const { price } = props.route.params;
	const primary = useThemeColor({}, "primary");
	const accent = useThemeColor({}, "accent");

	// 録音データ保存先
	const [RecordedURI, SetRecordedURI] = useState<string | null>("");
	// マイクの使用許可
	const [AudioPerm, SetAudioPerm] = useState<boolean>(false);
	// レコーディング中
	const [isRecording, SetisRecording] = useState<boolean>(false);

	const getPermission = async () => {
		// マイクの使用を尋ねる
		const getAudioPerm = await Audio.requestPermissionsAsync();
		// iOSおよびAndroidでのオーディオエクスペリエンスをカスタマイズ
		await Audio.setAudioModeAsync({
			// iOSで記録を有効にするか
			allowsRecordingIOS: true,
			// iOSでエクスペリエンスのオーディオをサイレントモードで再生するか
			playsInSilentModeIOS: true,
		});
		SetAudioPerm(getAudioPerm.granted);
	};

	useEffect(() => {
		getPermission();
	}, []);

	const onStartRecording = async () => {
		if (AudioPerm === true) {
			try {
				await recording.prepareToRecordAsync(
					Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
				);
				await recording.startAsync();
				SetisRecording(true);
			} catch (error) {
				console.info(error);
			}
		} else {
			getPermission();
		}
	};

	const onStopRecording = async () => {
		try {
			await recording.stopAndUnloadAsync();
			const result = recording.getURI();
			SetRecordedURI(result);
			recording = new Audio.Recording();
			SetisRecording(false);
		} catch (error) {
			console.info(error);
		}
	};

	console.info(RecordedURI);

	const onVoiceAuthentication = useCallback((price: string) => {
		props.navigation.navigate("Passcode", { price: price });
	}, []);

	return (
		<View style={viewStyles.semi}>
			{!RecordedURI ? (
				<>
					<Text style={styles.word}>「 フーペイ 」</Text>
					<Text style={styles.subText}>と言ってください</Text>
					<View
						lightBgColor={isRecording ? accent : primary}
						darkBgColor={isRecording ? accent : primary}
						style={styles.iconWraper}
					>
						<MaterialIcons
							name="keyboard-voice"
							size={150}
							color="white"
							// eslint-disable-next-line react/jsx-handler-names
							onPress={
								isRecording ? () => onStopRecording() : () => onStartRecording()
							}
						/>
					</View>
					<Text style={styles.subText}>発言するときはマイクボタンを</Text>
					<Text style={styles.subText}>長押ししてください</Text>
				</>
			) : (
				<>
					<AntDesign name="checkcircleo" size={150} color={primary} />
					<Text style={textStyles.result}>本人確認が完了しました</Text>
					<ColorButton
						title="暗証番号入力へ"
						outlineStyle={buttonStyles.outline}
						onPress={() => onVoiceAuthentication(price)}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	word: {
		paddingBottom: 10,
		fontSize: 40,
	},
	subText: {
		fontWeight: "normal",
		lineHeight: 30,
	},
	iconWraper: {
		padding: 15,
		margin: 15,
		borderRadius: 100,
	},
});
