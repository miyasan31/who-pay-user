import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast/src/core/toast";
import { useRecoilValue } from "recoil";
import { user } from "src/atoms";
import { requestFetcher } from "src/functions/fetcher";
import type { VoiceRecordScreenProps } from "types";

type Props = VoiceRecordScreenProps<"VoiceRecord" | "VoiceRecordUpdate"> & {
  screen: "VoiceRecord" | "VoiceRecordUpdate";
};

let recording = new Audio.Recording();

const white = "\u001b[37m";
const cyan = "\u001b[36m";
const reset = "\u001b[0m";

export const useVoiceRecord = (props: Props) => {
  const userInfo = useRecoilValue(user);
  // レコーディング中
  const [isRecording, setisRecording] = useState<boolean>(false);
  // マイクの使用許可
  const [audioPerm, setAudioPerm] = useState<boolean>(false);
  // 録音データ保存先URI
  const [recordedURI, setRecordedURI] = useState<{
    uri: string;
    encode: string;
  }>({
    uri: "",
    encode: "",
  });

  // 録音開始
  const onStartRecording = useCallback(async () => {
    if (audioPerm) {
      try {
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recording.startAsync();

        setisRecording(true);
      } catch (error) {
        console.info(error);
      }
    } else {
      getPermission();
    }
  }, [audioPerm]);

  // 録音停止
  const onStopRecording = useCallback(async () => {
    try {
      const toastId = toast.loading("処理中...", {
        icon: "💁‍♂️",
      });

      // 録音を停止する
      await recording.stopAndUnloadAsync();

      // 録音データのURIを取得
      const result = recording.getURI();

      // 録音データのURIを保存
      if (result) {
        const base64 = await FileSystem.readAsStringAsync(result, {
          encoding: "base64",
        });

        setRecordedURI({ uri: result, encode: base64 });
        console.info(cyan + "| ----------------- file ----------------- ");
        console.info(cyan + "| file | " + white + result + reset);
        console.info(cyan + "| ---------------------------------------- ");

        const requestBody = {
          User: { connect: { id: userInfo.id } },
          voiceFile: base64,
        };
        const { statusCode } = await requestFetcher(
          "/voice",
          requestBody,
          "POST"
        );

        if (statusCode >= 400) {
          toast("エラーが発生しました", {
            id: toastId,
            icon: "🤦‍♂️",
          });
          return;
        }
        const isCreate = props.screen === "VoiceRecord";
        toast(`音声を${isCreate ? "登録" : "更新"}しました`, {
          id: toastId,
          icon: "🤦‍♂️",
        });
      }

      // 録音用インスタンスを初期化
      recording = new Audio.Recording();
      // 録音状態をfalseにする
      setisRecording(false);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      props.navigation.navigate("VoiceRecordSettingSelect");
    } catch (error) {
      console.info(error);
    }
  }, [userInfo]);

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

  const onRecordingEvent = useMemo(() => {
    return isRecording ? onStopRecording : onStartRecording;
  }, [isRecording, onStartRecording, onStopRecording]);

  useEffect(() => {
    getPermission();
  }, []);

  return {
    isRecording,
    recordedURI,
    onRecordingEvent,
  };
};
