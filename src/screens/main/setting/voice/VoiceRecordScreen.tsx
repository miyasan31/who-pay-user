import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import type { VFC } from "react";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "src/components/custom";
import { Layout } from "src/components/layout";
import { useThemeColor, useVoiceRecord } from "src/hooks";
import type { VoiceRecordScreenProps } from "types";

export const VoiceRecordScreen: VFC<VoiceRecordScreenProps<"VoiceRecord">> = (
  props
) => {
  const primary = useThemeColor({}, "primary");
  const accent = useThemeColor({}, "accent");
  const { isRecording, recordedURI, onRecordingEvent } = useVoiceRecord({
    ...props,
    screen: "VoiceRecord",
  });

  return (
    <Layout>
      {!recordedURI.uri ? (
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
              onPress={onRecordingEvent}
            />
          </View>
          <Text style={styles.subText}>発言するときはマイクボタンを</Text>
          <Text style={styles.subText}>押してください</Text>
        </>
      ) : (
        <>
          <AntDesign name="checkcircleo" size={150} color={primary} />
          <Text style={styles.result}>録音が完了しました</Text>
        </>
      )}
    </Layout>
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

  result: {
    paddingTop: 20,
  },
});
