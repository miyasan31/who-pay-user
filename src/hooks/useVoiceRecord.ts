import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { user } from "src/atoms";
import { requestFetcher, ToastKit } from "src/functions";
import type { VoiceRecordScreenProps } from "types";

type Props = VoiceRecordScreenProps<"VoiceRecord" | "VoiceRecordUpdate"> & {
  screen: "VoiceRecord" | "VoiceRecordUpdate";
};

const recording = new Audio.Recording();

export const useVoiceRecord = (props: Props) => {
  const userInfo = useRecoilValue(user);
  // マイクの使用許可
  const [audioPerm, setAudioPerm] = useState<boolean>(false);
  const [recordingStatus, setRecordingStatus] = useState({
    isRecording: false,
    isRecorded: false,
  });

  // 録音開始
  const onStartRecording = useCallback(async () => {
    if (audioPerm) {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecordingStatus((prev) => ({
        ...prev,
        isRecording: true,
      }));
    } else {
      getPermission();
    }
  }, [audioPerm]);

  // 録音停止
  const onStopRecording = useCallback(async () => {
    const { ErrorToast, SuccessToast } = ToastKit();

    // 録音を停止する
    await recording.stopAndUnloadAsync();

    // 録音データのURIを取得
    const result = recording.getURI();
    if (!result) return ErrorToast("録音情報の取得に失敗しました");

    // 録音データのURIを保存
    const base64 = await FileSystem.readAsStringAsync(result, {
      encoding: "base64",
    });

    const { statusCode } = await requestFetcher("POST", "/voice", {
      userId: userInfo.id,
      voiceFile: base64,
    });

    if (statusCode >= 400)
      return ErrorToast(
        `録音情報の${
          props.screen === "VoiceRecord" ? "登録" : "更新"
        }に失敗しました`
      );
    SuccessToast(
      `音声を${props.screen === "VoiceRecord" ? "登録" : "更新"}しました`
    );

    // 録音状態をfalseにする
    setRecordingStatus({
      isRecording: false,
      isRecorded: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    props.navigation.navigate("VoiceRecordSettingSelect");
  }, [props, userInfo]);

  // マイクの使用許可を取得
  const getPermission = useCallback(async () => {
    // マイクの使用を尋ねる
    const getAudioPerm = await Audio.requestPermissionsAsync();
    // iOSおよびAndroidでのオーディオエクスペリエンスをカスタマイズ
    await Audio.setAudioModeAsync({
      // iOSで記録を有効にするか
      allowsRecordingIOS: true,
      // iOSでエクスペリエンスのオーディオをサイレントモードで再生するか
      playsInSilentModeIOS: true,
    });
    setAudioPerm(getAudioPerm.granted);
  }, []);

  useEffect(() => {
    getPermission();
  }, []);

  return {
    recordingStatus,
    onStartRecording,
    onStopRecording,
  };
};
